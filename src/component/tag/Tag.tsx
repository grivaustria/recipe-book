import style from "./tag.module.scss";

type ITag = {
  tabs: IStaticDataField[];
  selectedDishType: string;
  onClickTab: (dishType: string) => void;
};

const Tag = ({ tabs, selectedDishType, onClickTab }: ITag) => (
  <div className={style.filterTabs} id="filterTabs">
    {tabs.map((tab) => {
      const dishType = tab.field.toLowerCase();
      const isActive = selectedDishType === dishType;
      const nextValue =
        dishType === "all"
          ? selectedDishType === "all"
            ? ""
            : "all"
          : selectedDishType === dishType
            ? "all"
            : dishType;

      return (
        <button
          type="button"
          className={`${style.tab} ${isActive ? style.active : ""}`}
          key={tab.id}
          data-cat={tab.field}
          onClick={() => onClickTab(nextValue)}
        >
          {tab.value}
        </button>
      );
    })}
  </div>
);

export default Tag;
