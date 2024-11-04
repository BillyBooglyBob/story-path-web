export default function PreviewDescriptionItem({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <div className="text-white pb-4">
      <h2 className="font-bold">{title}:</h2>
      <p>{value}</p>
    </div>
  );
}
