import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import IUser from "../../types/IUser";

const SearchPage = () => {

  const searchTextInputRef = useRef<HTMLInputElement>(null)

  const [users, setUsers] = useState<IUser[]>([])

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)

  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    searchTextInputRef.current?.focus()
  }, [])

  return (
      <div className={'w-full h-screen flex items-start my-3 flex-col'}>
        <div className='relative w-full '>
          <Icon icon='material-symbols:search' fontSize={20} className='absolute top-[25%] mx-1' />
          <input
            onChange={handleInputChange}
            className='py-2 px-10 rounded-2xl text-black transition-transform duration-150'
            placeholder='Type in email'
            value={inputValue}
          />
        </div>
        { users.length > 0 && isResultOpen ? (
          <div className='flex flex-col gap-1'>
            {users.map((item) => (
              <MobileSearchResult key={item.id} />
            ))}
          </div>
        ) :  <div className='text-white font-bold m-5 text-center'>
          No Results
        </div> }
      </div>
  )
}

const MobileSearchResult = () => {
  return (
    <div></div>
  )
}

export default SearchPage