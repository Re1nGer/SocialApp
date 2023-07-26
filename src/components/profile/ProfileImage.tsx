import './Profile.scss'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { axios } from '../../axios'
import BackgroundProfileImageLoader from './BackgroundProfileImageLoader'
import { useParams } from "react-router-dom";

type ProfileBackgroundImagePropsType = {
  profileBackgroundImagelink: string
}

const defaultBackgroundImageLink: string  = "https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"

const ProfileBackgroundImage = ({ profileBackgroundImagelink }: ProfileBackgroundImagePropsType): JSX.Element => {

  const { userId } = useParams()

  const [backgroundLink, setBackgroundLink] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    //if userId then it's not our page
    if (userId) return
    fileInputRef.current?.click();
  }

  const handleBackgroundImageUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!event.currentTarget.files) return;
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('image', event.currentTarget.files[0])
      const { data } = await axios.post("/api/v1/user/backgroundimage", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setBackgroundLink(data?.backgroundImageLink)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  //probably there is a way to set the prop without useEffect hook
  useEffect(() => {
    setBackgroundLink(profileBackgroundImagelink)
  }, [profileBackgroundImagelink])

  return (
    <div className='profile-image__wrapper overflow-hidden' onClick={handleClick}>
      <input hidden type='file' ref={fileInputRef} onChange={handleBackgroundImageUpload} />
      <div className='profile-image__clear h-[400px] max-h-[400px]'>
        { isLoading ? (
          <BackgroundProfileImageLoader />
        ) : null }
        <img className={`profile-image__cut h-[400px] max-h-[400px] object-contain`}
             src={backgroundLink || defaultBackgroundImageLink} alt='profile header' />
      </div>
      <div className='profile-image__overlay h-[400px] max-h-[400px]' />
      <img className='profile-image__blur h-[400px] max-h-[400px]' src={backgroundLink || defaultBackgroundImageLink} alt='profile header' />
    </div>
  )
}

export default ProfileBackgroundImage
