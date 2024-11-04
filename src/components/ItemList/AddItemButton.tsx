type AddButtonProp = {
  handleAddItem: () => void;
};

export default function AddButton({ handleAddItem }: AddButtonProp) {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleAddItem}
        className="px-6 py-4 mt-[30px] bg-red-500 rounded-3xl hover:brightness-[170%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
