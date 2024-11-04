type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextArea({ label, name, value, onChange }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg mb-1">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md resize-none"
      />
    </div>
  );
}