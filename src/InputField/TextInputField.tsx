import React, { useState } from "react";
import IAPIError from "../types/IAPIError";
import { useFormContext, RegisterOptions, FieldError, get } from "react-hook-form";

type TextInputFieldProps = {
  id?: string,
  label?: string;
  name: string;
  type?: string,
  placeholder: string,
  defaultValue?: string,
  className?: string,
  disabled?: boolean,
  displayError?: boolean,
  required?: boolean,
  validationRules?: RegisterOptions,
  apiError?: IAPIError,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
};

const baseInputStyles: string = "transition:opacity duration-200 w-full p-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg";
const baseErrorStyles: string = "text-red-500 text-small";
const baseApiError: IAPIError = { type: '', message: '' };

const TextInputField = ({
                          id,
                          label,
                          name,
                          type = 'text',
                          placeholder,
                          defaultValue,
                          className,
                          disabled,
                          displayError = true,
                          required,
                          validationRules,
                          apiError,
                          onFocus,
                          onBlur
}: TextInputFieldProps): JSX.Element => {

  const { register, formState: { errors } } = useFormContext();
  const [apiErrorInner, setApiErrorInner] = useState<IAPIError>(baseApiError);
  const error = get(errors, name) as FieldError;
  const baseRequiredErrorMessage: string = `${label ?? name} is required`;

  const handleOnFocus = () => {
      if (apiErrorInner.type === name)
        setApiErrorInner(baseApiError);
  };

  React.useEffect(() => {
    setApiErrorInner(apiError ?? baseApiError);
  },[apiError]);

  return (
    <div className={'flex flex-col justify-start'}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...register(name, { required: required ? baseRequiredErrorMessage : false, ...validationRules }) }
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`${baseInputStyles} ${className} ${disabled ? 'opacity-50' : ''}}`}
        disabled={disabled}
        onFocus={onFocus ?? handleOnFocus}
        onBlur={onBlur}
      />
      { displayError && error?.message ? ( <small className={baseErrorStyles}>{error.message}</small> ) :
        <small className={baseErrorStyles}>{displayError && apiErrorInner.type === name && apiErrorInner?.message}</small>
      }
    </div>
  );
}

export default TextInputField;