import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import IUser from "../../types/IUser";
import { axios } from "../../axios";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../contexts/ThemeContext";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const SearchPage = () => {

  const [users, setUsers] = useState<IUser[]>([])

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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={'w-full h-screen flex items-center my-3 flex-col'}>
        <div className='relative flex justify-center'>
          <Icon icon='material-symbols:search' fontSize={20} className='absolute left-[0] top-[20%]  mx-1' />
          <input
            onChange={handleInputChange}
            className='p-3 px-10 rounded text-black transition-transform duration-150'
            placeholder='Type in email'
            value={inputValue}
          />
        </div>
        { users.length > 0 && showResults && (
        <div className={'bg-white p-2 w-full max-w-[260px] min-h-[400px] rounded'}>
            <div className='flex flex-col items-center w-full gap-1'>
              {users.map((item) => (
                <MobileSearchResult key={item.id} user={item} />
              ))}
            </div>
        </div>
        )}
        { users.length === 0 && (
          <div className='text-white font-bold m-5 text-center'>
            No Results
          </div>
        )}
      </motion.div>
  );
}



type MobileSearchResultType = {
  user: IUser
}

const MobileSearchResult = ({ user }: MobileSearchResultType) => {
  const { profileInfo: { id } } = useContext(ThemeContext);
  return (
    <Link to={user.id === id ? '/mypage' : `/user/${user.id}`} className={'flex justify-center hover:bg-gray-200 gap-5 p-1 text-black bg-gray-100 rounded max-w-[260px] w-full'}>
      <img src={user.lowResImageLink ?? defaultUserImg} alt={'avatar'} className={'rounded-full object-cover max-h-[25px] max-w-[25px]'} height={'25px'} width={'25px'} />
      { user.username }
    </Link>
  )
}

export default SearchPage