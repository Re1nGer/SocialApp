import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const HeaderHamburgerDrawer = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
       animate={{ width: "100%" }}
       exit={{ width: 0 }}
       className={"h-full w-0 fixed top-0 left-0 overflow-hidden py-[.5rem] bg-[#111] z-10"}>

      <ul className={"decoration-0 relative flex justify-start items-center flex-col h-full"}>
        <Link to={'/mypage'} className={"flex items-center gap-2 no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Home
          <Icon icon="line-md:home" />
        </Link>
        <Link to={'/feed'} className={"flex items-center gap-2 no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Feed
          <Icon icon="fluent:feed-28-regular" />
        </Link>
        <Link to={'/posts'} className={"flex items-center gap-2 no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Posts
          <Icon icon="ic:outline-broken-image" />
        </Link>
      </ul>

    </motion.div>
  )
}
export default HeaderHamburgerDrawer