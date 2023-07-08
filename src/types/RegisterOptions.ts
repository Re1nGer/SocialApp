import { Message, Validate, ValidationRule } from "react-hook-form";

type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>
  min: ValidationRule<number | string>
  max: ValidationRule<number | string>
  maxLength: ValidationRule<number | string>
  minLength: ValidationRule<number | string>
  pattern: ValidationRule<RegExp>
  validate: Validate<any, any> | Record<string, Validate<any, any>>
}>

export default RegisterOptions;
