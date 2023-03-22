import { useEffect } from "react";
//@ts-ignore
import GirlImage from '../../assets/girl1.jpg';
//@ts-ignore
import GirlImage2 from '../../assets/girl3.jpg';
import Overlay from '../../assets/download.jpg';
//@ts-ignore
import hoverEffect from 'hover-effect';


const LoginImage = (): JSX.Element => {

    useEffect(() => {
        new hoverEffect({
            parent: document.querySelector('.login__left_img'),
            intensity: .3,
            image1: GirlImage,
            image2: GirlImage2,
            displacementImage: Overlay,
            imagesRatio: 16/9,
            speedOut: .5,
            speedIn: .5
        });
    },[]);

    return (
        <div className="login__left">
            <div className="login__left_img"></div>
        </div> 
     );
}

export default LoginImage;