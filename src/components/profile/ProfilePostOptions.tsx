import { Icon } from "@iconify/react";

const ProfilePostOptions = () => {
  return <div className="flex justify-center gap-[4rem] mb-[2rem]">
    <div
      className="hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer">
      <Icon fontSize={16} icon="ic:baseline-chat" />
      Posts
    </div>
    <div
      className="hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer">
      <Icon fontSize={16} icon="uil:apps" />
      Images
    </div>
    <div
      className="hover:text-[#6c757d] duration-150 ease-in-out flex flex-wrap gap-[1rem] text-white items-center cursor-pointer">
      <Icon fontSize={16} icon="material-symbols:bookmark-outline" />
      Saved
    </div>
  </div>;
}
export default ProfilePostOptions
