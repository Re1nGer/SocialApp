import { ChangeEvent, useContext, useRef, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { axios } from '../../axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from "@iconify/react";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const UploadAndDisplayProfileImage = () => {

  const [profileImageSrc, setProfileImageSrc] = useState<string | undefined>("");

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { profileInfo: { highResImageLink }, setProfileInfo } = useContext(ThemeContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setProfileImageSrc(URL.createObjectURL(event.target.files[0]));
    await updateProfileImage(event.target.files[0]);
  };
  const handleUploadImageClick = () => {
    fileInputRef.current!.click();
  };
  const prepareFormData = (profileImage: Blob) => {
    const formData = new FormData();
    formData.append('image', profileImage!);
    return formData;
  };

  const updateProfileImage = async (profileImage: Blob) => {
    try {
      setIsUploading(true)
      const formData = prepareFormData(profileImage);
      const { data } = await axios.put('/api/v1/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfileInfo((prevState => ({...prevState, highResImageLink: data.highResImageLink,
        lowResImageLink: data.lowResImageLink
       })));
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsUploading(false)
    }
  };

  return <div className='flex flex-col relative'>
    { isUploading ? (
      <div className={'h-[150px] w-[150px] mt-[-8rem] sm:h-[300px] sm:w-[300px] animate-[pulse_2s_infinite] rounded-full bg-gradient-to-r from-transparent via-rose-100/10 to-transparent-translate-x-full' +
        'relative isolate overflow-hidden shadow-xl shadow-black/5'}></div>
    ) : (
      <AnimatePresence>
        <motion.img
          transition={{ ease: 'easeOut', duration: 0.2 }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className={'sm:w-[300px] sm:h-[300px] h-[150px] w-[150px] rounded-full mt-[-8rem] relative z-10'}
          src={profileImageSrc || highResImageLink || defaultUserImg}
          alt='profile'
        />
      </AnimatePresence>
    ) }
    <Icon
          icon="icons8:plus"
          onClick={handleUploadImageClick}
          fontSize={25}
          className={'absolute text-3xl sm:text-3xl bottom-0 z-10 text-white right-0 sm:right-5 sm:bottom-5 cursor-pointer'}
    />
    <input
      ref={fileInputRef}
      style={{ display: 'none' }}
      aria-labelledby="file-id"
      id="file"
      accept="image/*"
      type="file"
      onChange={handleProfileImageUpload}
    />
  </div>;
};

export default UploadAndDisplayProfileImage