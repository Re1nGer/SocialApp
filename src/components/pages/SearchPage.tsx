import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import IUser from "../../types/IUser";
import { axios } from "../../axios";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

const SearchPage = () => {

  const searchTextInputRef = useRef<HTMLInputElement>(null)

  const [users, setUsers] = useState<IUser[]>([])

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)

  const [inputValue, setInputValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showResults, setShowResults] = useState<boolean>(false);

  const debouncedValue = useDebounce<string>(inputValue, 300)

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

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useMemo(() => inputValue === "" && setShowResults(false), [inputValue]);

  useEffect(() => {
    if (inputValue) fetchUsers(debouncedValue)
  }, [debouncedValue])

  return (
      <div className={'w-full h-screen flex items-start my-3 flex-col'}>
        <div className='relative w-full flex justify-center'>
          <Icon icon='material-symbols:search' fontSize={20} className='absolute left-[17%] top-[20%]  mx-1' />
          <input
            onChange={handleInputChange}
            className='py-2 px-10 rounded-2xl text-black transition-transform duration-150'
            placeholder='Type in email'
            value={inputValue}
          />
        </div>
        { users.length > 0 && (
          <div className='flex flex-col items-center w-full gap-1'>
            {users.map((item) => (
              <MobileSearchResult key={item.id} user={item} />
            ))}
          </div>
        )}
        { users.length === 0 && (
          <div className='text-white font-bold m-5 text-center'>
            No Results
          </div>
        )}
      </div>
  )
}



type MobileSearchResultType = {
  user: IUser
}

const MobileSearchResult = ({ user }: MobileSearchResultType) => {
  return (
    <Link to={`/user/${user.id}`} className={'flex justify-center gap-5 p-1 text-black bg-white rounded-xl'}>
      <img src={user.lowResImageLink} alt={'avatar'} className={'rounded-full object-cover max-h-[25px] max-w-[25px]'} height={'25px'} width={'25px'} />
      { user.username }
    </Link>
  )
}

export default SearchPage