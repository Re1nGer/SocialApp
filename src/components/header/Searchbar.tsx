import { Icon } from '@iconify/react'
import './Searchbar.css'
import { useState, ChangeEvent, useEffect } from 'react'
import { axios } from '../../axios'
import useDebounce from '../../hooks/useDebounce'
import { Link } from 'react-router-dom'

type Users = {
  id: number
  username: string
  picture: string
}
const toImcSrc = (base64Str: string) => `data:image/jpeg;base64,${base64Str}`

function Searchbar(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedValue = useDebounce<string>(inputValue, 500)

  const [users, setUsers] = useState<Users[]>([])

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const fetchUsers = async (keyword: string): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<Users[]>(`/api/v1/user/list?q=${keyword}`)
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(debouncedValue)
  }, [debouncedValue])

  return (
    <div className='searchbar'>
      <Icon icon='material-symbols:search' fontSize={20} className='searchbar__input-icon' />
      <input
        onChange={handleInputChange}
        className='searchbar__input'
        placeholder='type in email'
        value={inputValue}
      />
      {users.length > 0 ? (
        <div className='searchbar__results'>
          {users.map((item) => (
            <Link to={'/profile'}>
              <div className='searchbar__result' key={item.id}>
                <img className='searchbar__result-img' src={toImcSrc(item.picture)} alt='search' />
                <div className='searchbar__result'>{item.username}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Searchbar
