import React, { useState } from "react";
import IAPIError from "../../types/IAPIError";
import { useFormContext, RegisterOptions, FieldError, get } from "react-hook-form";

type TextInputFieldProps = {
  id?: string,
  label?: string;
  name: string;
  type?: string,
  placeholder: string,
  defaultValue?: string,
  className?: string,
  labelClassName?: string,
  disabled?: boolean,
  displayError?: boolean,
  required?: boolean,
  maxLength?: number,
  validationRules?: RegisterOptions,
  apiError?: IAPIError,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
};

const baseErrorStyles: string = "text-red-500 text-small";
const baseApiError: IAPIError = { type: '', message: '' };
const baseInputStyles: string = "transition:opacity duration-200 w-full p-3 text-base text-gray-700 placeholder-gray-600 border rounded-lg";
const errorInputStyles: string = "transition:opacity duration-200 outline-0 placeholder:text-red-500 focus:border-red-500 border-red-500 duration-200 w-full p-3 text-base text-gray-700 placeholder-gray-600 border rounded-lg";

const TextInputField = ({
                          id,
                          label,
                          name,
                          type = 'text',
                          placeholder,
                          defaultValue,
                          labelClassName,
                          className,
                          disabled,
                          displayError = true,
                          required,
                          validationRules,
                          apiError,
                          onFocus,
                          onBlur,
                          maxLength
}: TextInputFieldProps): JSX.Element => {

  const { register, formState: { errors } } = useFormContext();
  const [apiErrorInner, setApiErrorInner] = useState<IAPIError>(baseApiError);
  const error = get(errors, name) as FieldError;
  const baseRequiredErrorMessage: string = `${label ?? name} is required`;
  const hasErrors = error?.message || apiErrorInner.type === name;
  const errorMessage = error?.message ? error.message : apiErrorInner.message;

  const handleOnFocus = () => {
      if (apiErrorInner.type === name)
        setApiErrorInner(baseApiError);
  };

  React.useEffect(() => {
    setApiErrorInner(apiError ?? baseApiError);
  },[apiError]);

  return (
    <div className={'flex flex-col justify-start'}>
      <label htmlFor={id} className={labelClassName}>{label}</label>
      <input
        id={id}
        {...register(name, { required: required ? baseRequiredErrorMessage : false, ...validationRules }) }
        type={type}
        placeholder={hasErrors ? errorMessage : placeholder}
        defaultValue={defaultValue}
        className={`${hasErrors ? errorInputStyles : baseInputStyles} ${className} ${disabled ? 'opacity-50' : ''}}`}
        disabled={disabled}
        onFocus={onFocus ?? handleOnFocus}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      <small className={baseErrorStyles}>{apiErrorInner.type === name && apiErrorInner?.message}</small>
    </div>
  );
}

export default TextInputField;