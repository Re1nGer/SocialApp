import React, { ChangeEvent, Dispatch, LegacyRef, SetStateAction, useRef, useState } from "react";
import { Icon } from '@iconify/react'
import { useForm, get, FieldError } from "react-hook-form";
import WarframeLoader from "../loader/WarframeLoader";
import { axios as call, axios } from "../../axios";
import CircleLoader from "../loader/CircleLoader";
import { motion } from "framer-motion";

type FeedPostModalType = {
  handleClose: () => void,
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}
type Ref = LegacyRef<HTMLFormElement> | undefined

export type FeedPostModalFormValues = {
  htmlContent: string,
  imageSrc?: string
}

export const FeedPostFormModal = ({ handleClose, setIsFormOpen }: FeedPostModalType, ref: Ref) => {

  const {
        register,
        getValues,
        formState: { errors },
        setValue,
        handleSubmit,
        watch
    } = useForm<FeedPostModalFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isImageGeneratingLoading, setIsImageGeneratingLoading] = useState<boolean>(false);

  const [isCaptionGeneratingLoading, setIsCaptionGeneratingLoading] = useState<boolean>(false);

  const [isImageUploadLoading, setIsImageUploadLoading] = useState<boolean>(false);

  const textareaError = get(errors, 'htmlContent') as FieldError;

  const htmlContent = watch('htmlContent');

  const handleSubmitForm = async (data: FeedPostModalFormValues, event: any) => {
    if (!event.target[2].files && !data.imageSrc) return;
    event.preventDefault()
    const { htmlContent } = data || {}
    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append('htmlContent', htmlContent)
      if (fileInputRef.current?.files) formData.append('image', fileInputRef.current.files[0]);
      if (data.imageSrc) formData.append('imageSrc', data.imageSrc);
      await call.post('/api/v1/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setIsFormOpen(false);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = async () => {
    if (imageSrc) await handleDeleteFromCloudinary();
    handleClose();
  }

  const onImagePreviewChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await handleUploadToCloudinary(e.target.files[0]);
  };

  const handleRemoveImage = async () => {
    await handleDeleteFromCloudinary();
    setImageSrc(null);
    setValue('imageSrc', '');
  }

  const handleUploadImageClick = () => {
    fileInputRef.current!.click();
  };

  const handleGenerateImage = async () => {
    const caption = getValues('htmlContent');
    try {
      setIsImageGeneratingLoading(true);
      const { data } = await axios.get(`/api/v1/post/image/${caption}`);
      setImageSrc(data.url);
      setValue('imageSrc', data.url);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsImageGeneratingLoading(false);
    }
  };
  const handleUploadToCloudinary = async (image: Blob) => {
    try {
      setIsImageUploadLoading(true);
      const formData = new FormData();
      formData.append('image', image);
      const { data } = await axios.post("/api/v1/post/image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setImageSrc(data.url);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsImageUploadLoading(false);
    }
  };
  const handleDeleteFromCloudinary = async () => {
    try {
      await axios.put(`/api/v1/post/image`, { url: imageSrc?.split('/').at(-1)?.split('.').at(0) });
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleGenerateCaption = async () => {
    if (!imageSrc) return;
    setIsCaptionGeneratingLoading(true);
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_RAPID_URL,
      params: {
        imageUrl: imageSrc,
        useHashtags: 'true',
        limit: '1'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_HOST
      }
    };

    try {
      const response = await axios.request(options);
      setValue('htmlContent', response.data.captions[0])
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsCaptionGeneratingLoading(false);
    }
  }

  return (
    <>
      <div className='feed__post-form_overlay' onClick={handleCloseModal} />
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className='feed__post-form'
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='feed__post-form_title-container'>
          <div className='feed__post-form_title'>Create Post</div>
          <Icon
            className='feed__post-form_title-icon'
            icon='material-symbols:close'
            onClick={handleCloseModal}
          />
        </div>
        <div className='feed__post-form_input-container'>
          <label htmlFor={'caption'} className={'text-white py-1'}>Add Caption:</label>
          <textarea
            id={'caption'}
            className='feed__post-form_input m-0'
            {...register('htmlContent', { required: "Caption cannot be empty" })}
            placeholder={'What is on your mind?'}
          />
          { textareaError?.message ? (
            <div className={'text-red-500 mb-2 w-full'}>{ textareaError?.message }</div>
          ) : null }
        </div>
        { isCaptionGeneratingLoading ? (
          <>
            <span className={'text-white'}>Caption is being generated. Please, Stand By</span>
            <CircleLoader />
          </>
        ) : null }
        <button
          type={'button'}
          disabled={isLoading || isImageGeneratingLoading || isCaptionGeneratingLoading || !imageSrc}
          onClick={handleGenerateCaption}
          className={`rounded-lg p-3 w-full text-white disabled:opacity-50 shadow ${isCaptionGeneratingLoading ? 'opacity-50' : ''}
           bg-black border min-w-[200px]`}>
          Generate Caption From Image
        </button>

        <label htmlFor='feed__post-image' className='feed__post-image'>
          <div className={'flex justify-between items-center mt-2'}>
            {imageSrc ? 'Added Content' : 'Add Content:'}
            { imageSrc ? (
              <Icon
                className='feed__post-form_title-icon'
                icon='material-symbols:close'
                onClick={handleRemoveImage}
              />
            ) : null }
          </div>
        </label>

        <div className='feed__post-drag-drop mb-2'>

          { isImageGeneratingLoading ? (
            <CircleLoader />
          ) : null }

          { isImageUploadLoading ? (
            <CircleLoader />
          ) : null }

          {imageSrc ? (
            <motion.img
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className={`transition-opacity duration-150 feed__post-drag ${isLoading ? 'opacity-50' : ''}`}
                src={imageSrc}
                alt='post form'
            />

          ) : ( isImageGeneratingLoading ? <p>Generating Image, Please Stand By </p> : <p>Added Content Will Be Shown Here</p> )}
          <div className='overlay' />
        </div>
        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          aria-labelledby="file-id"
          id="file"
          accept="image/*"
          name={'postfile'}
          type="file"
          onChange={onImagePreviewChange}
        />
        <input {...register("imageSrc")} hidden />
        <button
          type={'button'}
          className="bg-transparent border rounded-lg border-white bg-black text-white w-full p-3"
          onClick={handleUploadImageClick}
        >
          Upload Image
        </button>
        <div className={'w-full text-center text-white my-1'}>OR</div>
        <button
          type={'button'}
          onClick={handleGenerateImage}
          className={'rounded-lg disabled:opacity-50 transition-opacity p-3 w-full text-black mb-5 shadow bg-white border min-w-[200px]'}
          disabled={!htmlContent?.trim()}
        >
          Generate Image From Caption
        </button>
        { isLoading && <WarframeLoader /> }
        <button
          className={`rounded-lg p-3 w-full text-white shadow bg-black border min-w-[200px] hover:bg-slate-800 ease-in-out transition-opacity duration-150  ${isLoading || isImageGeneratingLoading || isCaptionGeneratingLoading ? 'opacity-50' : ''}`}>
          Submit Post
        </button>
      </form>
    </>
  )
}