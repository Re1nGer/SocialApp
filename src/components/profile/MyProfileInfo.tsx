import { Icon } from "@iconify/react";
import UploadAndDisplayProfileImage from "./UploadAndDisplayProfileImage";
import DisplayProfileInfo from "./DisplayProfileInfo";

const MyProfileInfo = () => {

  return (
    <>
      <div className='max-w-[1150px] w-full mx-auto'>
        <div className='flex justify-start my-2'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-3 grow-[.5]'>
            <UploadAndDisplayProfileImage />
            <DisplayProfileInfo />
          </div>
          <div className='cursor-pointer'>
            <Icon
              icon='material-symbols:edit'
              fontSize='25px'
              color='#fff'
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default MyProfileInfo