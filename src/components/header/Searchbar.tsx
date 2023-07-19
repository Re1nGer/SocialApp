import { Icon } from '@iconify/react'
import './Searchbar.css'
import { useState, ChangeEvent, useEffect, useCallback, useMemo } from "react";
import { axios } from '../../axios'
import useDebounce from '../../hooks/useDebounce'
import SearchbarResult from './SearchbarResult'
import IUser from '../../types/IUser'

const Searchbar = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedValue = useDebounce<string>(inputValue, 300)

  const [users, setUsers] = useState<IUser[]>([])

  const [showResults, setShowResults] = useState<boolean>(false)
  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  //TODO: add pagination
  const fetchUsers = async (keyword: string): Promise<void> => {
    try {
      setIsLoading(true);
      setShowResults(true);
      const { data } = await axios.get<IUser[]>(`/api/v1/user/list?q=${keyword}`)
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inputValue) fetchUsers(debouncedValue)
  }, [debouncedValue])

  useMemo(() => inputValue === "" && setShowResults(false), [inputValue]);

  return (
    <div className='searchbar'>
      <Icon icon='material-symbols:search' fontSize={20} className='searchbar__input-icon' />
      <input
        onChange={handleInputChange}
        className='searchbar__input rounded-2xl text-black transition-transform duration-150'
        placeholder='Type in email'
        value={inputValue}
      />
      { showResults && (
        <div className='searchbar__results'>
          { users.length > 0 ? (
            users.map((item) => (
              <SearchbarResult key={item.id} {...item} setShowResults={setShowResults} />
            ))
          ) : <span className="text-black text-sm font-bold text-center my-5">No Results Found</span> }
        </div>
      ) }
    </div>
  )
}

export default Searchbar