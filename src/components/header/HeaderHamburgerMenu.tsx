import HeaderHamburgerIcon from "./HeaderHamburgerIcon";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeaderHamburgerDrawer from "./HeaderHamburgerDrawer";


const HeaderHamburgerMenu = () => {

  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <>
      <HeaderHamburgerIcon open={open} handleOpen={handleOpen} />
      <AnimatePresence>
        { open && ( <HeaderHamburgerDrawer /> ) }
      </AnimatePresence>
    </>
  )
}
export default HeaderHamburgerMenu