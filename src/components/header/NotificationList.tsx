import { ReactNode } from "react";
import { motion } from "framer-motion";

type NotificationListProps = {
  children?: ReactNode
}
const NotificationList = ({ children }: NotificationListProps) => {
  return <motion.ul initial={{ opacity: 0, scale: .5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    role="list"
                    className={`h-[200px] bg-black w-[200px] absolute top-[3rem] right-0 z-10`}
  >
    {children}
  </motion.ul>;
};
export default NotificationList