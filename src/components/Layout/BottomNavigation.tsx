import { AnimatePresence, motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const MobileBottomNavigation = () => {

  const { scrollY } = useScroll();

  const location = useLocation()

  const [isUp, setIsUp] = useState<boolean>(false)

  const controls = useAnimation();

  useDebounce(isUp, 100)
  const getIsUp = (latest: number) => {
    if (scrollY.getPrevious() > latest) {
      setIsUp(true)
    }
    else setIsUp(false)
  }

  useMotionValueEvent(scrollY, "change", (latest:number) => {

    getIsUp(latest)

    if (isUp) {
      controls.start({ height: '58px' }, { duration: .1, delay: 0.3 })
    }
    else {
      controls.start({ height: 0 }, { duration: .1, delay: .1 })
    }
  })

  useEffect(() => {
    controls.start({ height: '58px' }, { duration: .1, delay: 0.3 });
  }, [location.pathname])

  const isLoginPages = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";

  if (isLoginPages) return null

  return (
    <AnimatePresence>
      <motion.section
        initial={{ height: 0 }}
        animate={controls}
        id="bottom-navigation"
        className="lg:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <div id="tabs" className="flex justify-between gap-1 px-2 h-full">
          <Link to="/mypage" className="w-full flex flex-col items-center focus:text-[#97c0de] hover:text-[#97c0de] justify-center text-center">
            <Icon icon="line-md:home" fontSize={30} />
          </Link>
          <Link to="/search" className="w-full flex flex-col items-center focus:text-[#97c0de] hover:text-[#97c0de] justify-center text-center">
            <Icon icon="mingcute:user-search-line" fontSize={30} />
          </Link>
          <Link to="/feed" className="w-full flex flex-col items-center focus:text-[#97c0de] hover:text-[#97c0de] justify-center text-center">
            <Icon icon="solar:posts-carousel-vertical-outline" fontSize={30} />
          </Link>
          <Link to="/account" className="w-full flex flex-col items-center focus:text-[#97c0de] hover:text-[#97c0de] justify-center text-center">
            <Icon icon="codicon:account" fontSize={30} />
          </Link>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default MobileBottomNavigation
