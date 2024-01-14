interface FormInputProps {
  label: string;
  error?: string;
  id: string;
  value: string | null | undefined;
  placeholder?: string;
  name?: string;
  type?: string;
  labelClass?: string;
  isRequired?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  error,
  id,
  value,
  labelClass = '',
  isRequired = false,
  onChange,
  ...rest
}: FormInputProps) {

  let errorText = '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isRequired && event.target.value === '') {
      errorText = 'Please enter a value';
    }

    onChange(event);
  }

  return (
    <div className="grid pb-6 h-32 content-start">
      <label className={`pb-1 text-sm ${labelClass}`} htmlFor={id}>{label}</label>
      <input className="text-xl p-4 rounded-lg" id={id} value={value ?? ''} onChange={handleChange} {...rest} />
      {error && <span className="text-red-600 text-sm pt-1">{errorText || error}</span>}
    </div>
  );
}
