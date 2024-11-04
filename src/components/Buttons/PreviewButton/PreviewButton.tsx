export default function PreviewButton({
  handlePreview,
}: {
  handlePreview: () => void;
}) {
  return (
    <button
      onClick={handlePreview}
      className="text-white font-bold text-lg uppercase border-HeaderBg rounded-lg border-2 p-3 px-10 hover:brightness-150 duration-300"
    >
      Preview
    </button>
  );
}
