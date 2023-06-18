import { useEffect, useRef } from "react";

const SearchPage = () => {

  const searchTextInputRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    searchTextInputRef.current?.focus()
  }, [])

  return (
      <div className={'w-full h-screen flex justify-center items-start my-3'}>
        <input
              ref={searchTextInputRef}
              placeholder={"Type In Username"}
             className={'p-3 outline-0 border-0 bg-white text-black rounded-xl items-start' } />
      </div>
  )
}

export default SearchPage