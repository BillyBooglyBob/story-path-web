type TextInputProps = {
  type?: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
}: TextInputProps) {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-lg mb-1">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
      />
    </div>
  );
}
