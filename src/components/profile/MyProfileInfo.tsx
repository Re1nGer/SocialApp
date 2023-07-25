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
        </div>
      </div>
    </>
  )
}
export default MyProfileInfo