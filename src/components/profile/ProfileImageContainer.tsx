import { useEffect, useState } from 'react'
import { ProfileImage } from './ProfileImage'

function ProfileImageContainer(): JSX.Element {
  const fetchProfileImage = () => {}

  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    fetchProfileImage()
  }, [])

  return <ProfileImage />
}
