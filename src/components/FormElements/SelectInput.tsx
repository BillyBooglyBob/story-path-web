type SelectInputProps = {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectInput({ label, name, value, options, onChange }: SelectInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg mb-1">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
