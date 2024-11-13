type ListItemSectionInfoProp = {
  title: string;
  value: string;
};

export default function ListItemSectionInfo({
  title,
  value,
}: ListItemSectionInfoProp) {
  return (
    <div>
      {title}: <br />
      {value}
    </div>
  );
}
