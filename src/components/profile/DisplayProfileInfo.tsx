import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const DisplayProfileInfo = () => {
  const { profileInfo: { username, intro } } = useContext(ThemeContext)
  return <div className="flex flex-col">
    <h1 className="text-white text-3xl">{username}</h1>
    <p className="profile-info__bio">
      { intro }
    </p>
  </div>;
};

export default DisplayProfileInfo