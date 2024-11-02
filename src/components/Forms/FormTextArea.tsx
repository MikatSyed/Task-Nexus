"use client";
import { useFormContext, Controller } from 'react-hook-form';

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  className?: string;
};

const FormTextArea = ({ 
  name,
  label,
  rows = 4,
  value,
  placeholder,
  className = ''
}: TextAreaProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </div>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            rows={rows}
            className={`w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${className}`}
            placeholder={placeholder}
            {...field}
            defaultValue={value ?? field.value}
          />
        )}
      />
    </>
  );
};

export default FormTextArea;
