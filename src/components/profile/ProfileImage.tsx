import './Profile.scss'
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { axios } from '../../axios'
import BackgroundProfileImageLoader from './BackgroundProfileImageLoader'
import { ThemeContext } from "../contexts/ThemeContext";

type ProfileBackgroundImagePropsType = {
  link: string
}

const defaultBackgroundImageLink: string  = "https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"

function ProfileBackgroundImage(): JSX.Element {

  const { profileInfo: { profileBackgroundImagelink } } = useContext(ThemeContext)

  const [backgroundLink, setBackgroundLink] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
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
      <div className='profile-image__clear max-h-[400px]'>
        { isLoading ? (
          <BackgroundProfileImageLoader />
        ) : null }
        <img className={`profile-image__cut max-h-[400px] object-contain`}
             src={backgroundLink || defaultBackgroundImageLink} alt='profile header' />
      </div>
      <div className='profile-image__overlay' />
      <img className='profile-image__blur' src={backgroundLink || defaultBackgroundImageLink} alt='profile header' />
    </div>
  )
}

export default ProfileBackgroundImage
