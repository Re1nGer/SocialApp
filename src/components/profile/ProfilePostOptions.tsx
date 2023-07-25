import { Icon } from "@iconify/react";
import { useState } from "react";
import { ProfilePosts } from "./ProfilePosts";
import SavedPosts from "./SavedPosts";
import { motion } from "framer-motion";
import Images from "./Images";

const ProfilePostOptions = () => {

  const [active, setActive] = useState(0);

  const renderComponent = () => {
    switch (active) {
      case 0:
        return <ProfilePosts />;
      case 1:
        return <Images />;
      case 2:
        return <SavedPosts />;
      default:
        return <ProfilePosts />;
    }
  };

  return <>
          <div className="flex justify-center gap-[4rem] mb-[2rem]">
          <div
            onClick={() => setActive(0)}
            className="hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer">
            <Icon fontSize={16} icon="ic:baseline-chat" />
            Posts
          </div>
          <div
            onClick={() => setActive(1)}
            className="hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer">
            <Icon fontSize={16} icon="uil:apps" />
            Images
          </div>
          <div
            onClick={() => setActive(2)}
            className={`hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer ${active === 2 && 'text-[#6c757d]'}`}>
            <Icon fontSize={16} icon="material-symbols:bookmark-outline" />
            Saved
          </div>
        </div>
        <motion.div layout className='flex flex-wrap gap-[1rem] justify-center'>
          { renderComponent() }
        </motion.div>
      </>;
  }
export default ProfilePostOptions
