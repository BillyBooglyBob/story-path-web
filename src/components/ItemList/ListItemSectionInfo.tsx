type ListItemSectionInfoProp = {
  title: String;
  value: String;
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
