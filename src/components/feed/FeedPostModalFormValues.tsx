import React, { ChangeEvent, LegacyRef, useRef } from "react";
import { Icon } from '@iconify/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import WarframeLoader from "../loader/WarframeLoader";

type FeedPostModalType = {
  handleClose: () => void
  handleSubmitForm: SubmitHandler<FeedPostModalFormValues>,
  isLoading: boolean
}
type Ref = LegacyRef<HTMLFormElement> | undefined

export type FeedPostModalFormValues = {
  htmlContent: string
}

export const FeedPostFormModal = (
  { handleClose, handleSubmitForm, isLoading }: FeedPostModalType,
  ref: Ref,
) => {
  const { register, handleSubmit } = useForm<FeedPostModalFormValues>()

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null)
  const onImagePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }
  const handleUploadImageClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <>
      <div className='feed__post-form_overlay' onClick={handleClose} />
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
            onClick={handleClose}
          />
        </div>
        <div className='feed__post-form_input-container'>
          <textarea
            className='feed__post-form_input'
            {...register('htmlContent')}
            placeholder={'What is on your mind ?'}
          />
        </div>
        <label htmlFor='feed__post-image' className='feed__post-image'>
          {imageSrc ? 'Added Image' : 'Add an Image:'}
        </label>
        <div className='feed__post-drag-drop'>
          {imageSrc ? (
            <img className={`transition-opacity duration-150 feed__post-drag ${isLoading ? 'opacity-50' : ''}`} src={imageSrc} alt='post form' />
          ) : (
            <p>Drag and drop your files here</p>
          )}
          <div className='overlay' />
        </div>
        <input
          accept='image/*'
          className={'hidden'}
          type='file'
          id='postfile'
          name='postfile'
          onChange={onImagePreviewChange}
        />
        {imageSrc ? null : (
          <>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              aria-labelledby="file-id"
              id="file"
              accept="image/*"
              type="file"
              onChange={onImagePreviewChange}
            />
            <button className="bg-transparent border rounded-xl border-white bg-black text-white p-2 my-5" onClick={handleUploadImageClick}>
              Upload Image
            </button>
          </>
        )}
        { isLoading && <WarframeLoader /> }
        <button className={`rounded-lg p-3 w-full text-white shadow bg-black border min-w-[200px] hover:bg-slate-800 ease-in-out transition-opacity duration-150  ${isLoading ? 'opacity-50' : ''}`}>Submit Post</button>
      </form>
    </>
  )
}