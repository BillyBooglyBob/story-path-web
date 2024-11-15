import ListItemLoading from "./ListItemLoading";
import ListItemTitleLoading from "./ListItemTitleLoading";
import ListItemSectionInfoLoading from "./ListItemSectionInfoLoading";
import ListItemSection from "../ItemList/ListItemSection";
import ListItemButtonContainer from "../ItemList/ListItemButtonContainer";

const LoadingList = () => {
  return (
    <div>
      <ListItemLoading>
        <ListItemTitleLoading />

        {/* Col 0 */}
        <ListItemSection>
          <ListItemSectionInfoLoading />
          <ListItemSectionInfoLoading />
        </ListItemSection>

        {/* Col 1 */}
        <ListItemSection>
          <ListItemSectionInfoLoading />
        </ListItemSection>

        {/* Col 2 */}
        <ListItemSection>
          <ListItemSectionInfoLoading />
          <ListItemSectionInfoLoading />
        </ListItemSection>

        {/* Col 3 */}
        <ListItemButtonContainer>
          <ListItemTitleLoading />
          <ListItemTitleLoading />
          <ListItemTitleLoading />
        </ListItemButtonContainer>
      </ListItemLoading>
    </div>
  );
};

export default LoadingList;
