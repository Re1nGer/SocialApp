import { ChangeEvent, useContext, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { axios } from "../../axios";
import { AnimatePresence, motion } from "framer-motion";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const UploadAndDisplayProfileImage = () => {

  const [profileImageSrc, setProfileImageSrc] = useState<string | undefined>("");

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [profileImage, setProfileImage] = useState<Blob | null>(null);

  const { profileInfo: { highResImageLink }, setProfileInfo } = useContext(ThemeContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setProfileImageSrc(URL.createObjectURL(event.target.files[0]));
    setProfileImage(event.target.files[0]);
  };
  const handleUploadImageClick = () => {
    fileInputRef.current!.click();
  };
  const handleCancelUpload = () => {
    setProfileImage(null);
    setProfileImageSrc("");
  };

  const prepareFormData = () => {
    const formData = new FormData();
    formData.append("image", profileImage!);
    return formData;
  };

  const updateProfileImage = async () => {
    try {
      setIsUploading(true)
      const formData = prepareFormData();
      const { data } = await axios.put("/api/v1/user/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setProfileImage(null);
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
  return <div className="flex flex-col">
    { isUploading ? (
      <div className={'h-[400px] w-[400px] mt-[-8rem] rounded-full bg-gradient-to-r from-transparent via-rose-100/10 to-transparent-translate-x-full animate-[shimmer_2s_infinite]' +
        'relative before:rounded-full before:max-w-[400px] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent' +
        'isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-rose-100/10'}></div>
    ) : (
      <AnimatePresence>
        <motion.img
          transition={{ ease: "easeOut", duration: 0.2 }}
          height={"300px"}
          width={"300px"}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className={"rounded-full mt-[-8rem] relative z-10 max-h-[300px] max-w-[300px]"}
          src={profileImageSrc || highResImageLink || defaultUserImg}
          alt="profile"
        />
      </AnimatePresence>

    ) }

    {profileImage ? (
      <div className="flex gap-2 justify-center my-3">
        <button onClick={updateProfileImage} className="bg-white text-black border p-2 rounded-lg">Upload</button>
        <button onClick={handleCancelUpload} className="bg-black text-white border p-2 rounded-lg">Cancel</button>
      </div>
    ) : (
      <>
        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          aria-labelledby="file-id"
          id="file"
          accept="image/*"
          type="file"
          onChange={handleProfileImageUpload}
        />
        <button className="border border-white bg-black text-white p-2 my-2" onClick={handleUploadImageClick}>
          Upload
        </button>
      </>
    )}
  </div>;
}

export default UploadAndDisplayProfileImage