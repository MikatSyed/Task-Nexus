"use client";
import { useFormContext, Controller } from 'react-hook-form';
import { getErrorMessageByPropertyName } from '../../utils/schema-validator';


interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  className?: string;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,

  label,
  className = "",
}: IInput) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label && <div className="block text-sm font-medium text-gray-700 mb-1">{label}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            id={id}
          
            placeholder={placeholder}
            className={`w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${className} ${
              size === "large" ? "text-lg" : "text-sm"
            } ${type === "password" ? "password" : ""}`}
            {...field}
            value={value ?? field.value}
          />
        )}
      />
      {errorMessage && <small className="text-red-500 mt-1 block">{errorMessage}</small>}
    </>
  );
};

export default FormInput;
