type ListItemProp = {
  title: string;
};

export default function ListItemTitle({ title }: ListItemProp) {
  return (
    <div className="flex-1 text-2xl font-semibold text-white">{title}</div>
  );
}
