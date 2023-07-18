import { ChangeEvent, useContext, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { axios } from "../../axios";
import { AnimatePresence, motion } from "framer-motion";

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const UploadAndDisplayProfileImage = () => {

  const [profileImageSrc, setProfileImageSrc] = useState<string | undefined>("");

  const [profileImage, setProfileImage] = useState<Blob | null>(null);

  const { profileInfo: { highResImageLink } } = useContext(ThemeContext);

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
    setProfileImageSrc(profileImageSrc);
  };

  const prepareFormData = () => {
    const formData = new FormData();
    formData.append("image", profileImage!);
    return formData;
  };

  const updateProfileImage = async () => {
    try {
      const formData = prepareFormData();
      await axios.put("/api/v1/user/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setProfileImage(null);
    } catch (error) {
      console.log(error);
    }
  };
  return <div className="flex flex-col">
    <AnimatePresence>
      <motion.img
        transition={{ ease: "easeOut", duration: 0.2 }}
        height={"300px"}
        width={"300px"}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className={"object-contain"}
        src={profileImageSrc || highResImageLink || defaultUserImg}
        alt="profile"
      />
    </AnimatePresence>

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
          Upload from computer
        </button>
      </>
    )}
  </div>;
}

export default UploadAndDisplayProfileImage