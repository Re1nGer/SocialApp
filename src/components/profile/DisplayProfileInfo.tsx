import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const DisplayProfileInfo = () => {
  const { profileInfo: { username } } = useContext(ThemeContext)
  return <div className="flex flex-col">
    <h1 className="text-white text-3xl">{username}</h1>
    <p className="profile-info__bio">
      Welcome to my profile ♡
      <br />
      Follow me plz
      <br />
      <a className="profile-info__link" href="#">
        @Otheruser
      </a>
    </p>
  </div>;
};

export default DisplayProfileInfo