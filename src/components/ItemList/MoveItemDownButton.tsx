export default function MoveItemDownButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button onClick={handleClick} className="hover:bg-gray-800 rounded-3xl p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </button>
  );
}
