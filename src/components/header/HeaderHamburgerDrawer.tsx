import { motion } from "framer-motion";

const HeaderHamburgerDrawer = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
       animate={{ width: "100%" }}
       exit={{ width: 0 }}
       className={"h-full w-0 fixed top-0 left-0 overflow-hidden py-[.5rem] bg-[#111] z-10"}>

      <ul className={"decoration-0 relative flex justify-start items-center flex-col h-full"}>
        <li className={"no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Home
        </li>
        <li className={"no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Feed
        </li>
        <li className={"no-underline decoration-0 text-white text-3xl font-bold my-4"}>
          Posts
        </li>
      </ul>

    </motion.div>
  )
}
export default HeaderHamburgerDrawer