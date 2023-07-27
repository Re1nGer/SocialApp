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
      <div className={'h-[150px] w-[150px] mt-[-8rem] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-r from-transparent via-rose-100/10 to-transparent-translate-x-full animate-[shimmer_2s_infinite]' +
        'relative before:rounded-full before:max-h-[150px] before:max-w-[150px] sm:before:max-w-[400px] sm:before:max-h-[400px] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent' +
        'isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-rose-100/10'}></div>
    ) : (
      <AnimatePresence>
        <motion.img
          transition={{ ease: 'easeOut', duration: 0.2 }}
          height={'300px'}
          width={'300px'}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className={'sm:max-w-[300px] rounded-full mt-[-8rem] relative z-10 max-h-[300px] max-w-[150px]'}
          src={profileImageSrc || highResImageLink || defaultUserImg}
          alt='profile'
        />
      </AnimatePresence>
    ) }
    <Icon icon="icons8:plus" onClick={handleUploadImageClick} fontSize={25} className={'absolute text-3xl sm:text-3xl bottom-0 z-10 text-white right-5 sm:right-14 sm:bottom-5'} />
      <>
        <input
          ref={fileInputRef}
          style={{ display: 'none' }}
          aria-labelledby="file-id"
          id="file"
          accept="image/*"
          type="file"
          onChange={handleProfileImageUpload}
        />
      </>
  </div>;
};

export default UploadAndDisplayProfileImage