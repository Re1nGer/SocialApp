import { Icon } from '@iconify/react'
import './Searchbar.css'
import { useState, ChangeEvent, useEffect } from 'react'
import { axios } from '../../axios'
import useDebounce from '../../hooks/useDebounce'
import { SearchbarResult } from './SearchbarResult'
import IUser from '../../types/IUser'


function Searchbar(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)

  const debouncedValue = useDebounce<string>(inputValue, 500)

  const [users, setUsers] = useState<IUser[]>([])

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  //TODO: add pagination
  const fetchUsers = async (keyword: string): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IUser[]>(`/api/v1/user/list?q=${keyword}`)
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResultClick = () => {
    setIsResultOpen(false)
  }

  useEffect(() => {
    if (inputValue) fetchUsers(debouncedValue)
    if (users.length > 0) setIsResultOpen(true)
  }, [debouncedValue])

  return (
    <div className='searchbar'>
      <Icon icon='material-symbols:search' fontSize={20} className='searchbar__input-icon' />
      <input
        onChange={handleInputChange}
        className='searchbar__input text-black'
        placeholder='Type in email'
        value={inputValue}
      />
      { users.length > 0 && isResultOpen ? (
        <div className='searchbar__results'>
          {users.map((item) => (
            <SearchbarResult key={item.id} {...item} handleResultClick={handleResultClick} />
          ))}
        </div>
      ) : null }
    </div>
  )
}

export default Searchbar
