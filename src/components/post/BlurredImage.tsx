type BlurredImagePropType = {
    src: string | undefined,
    alt?: string
}

export const BlurredImage = ({ src, alt }: BlurredImagePropType) => {
    return <img className="post__img" src={src} alt={alt} />; //style={{ filter: 'blur(10px)' }} />
};
