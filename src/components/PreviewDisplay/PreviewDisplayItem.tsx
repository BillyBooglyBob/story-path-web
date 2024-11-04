type PreviewDisplayItemProps = {
  title: string;
  value?: string;
};

export default function PreviewDisplayItem({
  title,
  value,
}: PreviewDisplayItemProps) {
  return (
    <div>
      <h3>{title}</h3>
      {value && <p>{value}</p>}
    </div>
  );
}
