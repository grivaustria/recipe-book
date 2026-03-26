import type { ChangeEventHandler } from "react";
import style from "./Header.module.scss";
import SearchBar from "@component/search-bar/search-bar.component";
import Tag from "@component/tag/Tag";
import AuthUser from "@component/auth-user/auth-user.component";
import { useNavigate } from "react-router-dom";
import { useSetAuthUser } from "@hooks/useSetAuthUser";
import { logOutUser } from "@utils/supabase.utils";
import { useWindowResize } from "@src/hooks/useWindowResize";

type IHeader = {
  className?: string;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onDishTypeChange: (dishType: string) => void;
  selectedDishType: string;
};

const Header = ({
  className,
  onSearchChange,
  onDishTypeChange,
  selectedDishType,
}: IHeader) => {
  const tabs: IStaticDataField[] = [
    { id: "tab-all", field: "All", value: "All" },
    { id: "tab-fish", field: "Fish", value: "🐟 Fish" },
    { id: "tab-meat", field: "Meat", value: "🍖 Meat" },
    { id: "tab-veggies", field: "Veggies", value: "🥦 Veggies" },
    { id: "tab-dessert", field: "Dessert", value: "🍮 Dessert" },
  ];

  const navigate = useNavigate();

  const { user } = useSetAuthUser();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/login");
  };

  const { isMobile, dishGaleriaTablet } = useWindowResize();

  return (
    <header className={`${className} ${style.header}`}>
      {isMobile ? (
        <div className={style.mobileHeader}>
          <div className={style.topHeader}>
            <a className={style.logo} href="#">
              Dish <em>Galeria</em>
            </a>

            <div className={style.mobileSearch}>
              <SearchBar onChangeHandler={onSearchChange} />
            </div>

            {user && (
              <AuthUser
                user={user}
                logout={handleLogout}
                className={style.mobileAuthUser}
              />
            )}
          </div>

          <div className={style.filterRow}>
            <Tag
              tabs={tabs}
              selectedDishType={selectedDishType}
              onClickTab={onDishTypeChange}
            />
          </div>
        </div>
      ) : dishGaleriaTablet ? (
        <div className="flex flex-col items-center justify-center w-full gap-2 pb-4">
          <div className="h-17 flex items-center justify-between w-full">
            <a className={style.logo} href="#">
              Dish <em>Galeria</em>
            </a>

            {user && <AuthUser user={user} logout={handleLogout} />}
          </div>

          <SearchBar onChangeHandler={onSearchChange} />
          <Tag
            tabs={tabs}
            selectedDishType={selectedDishType}
            onClickTab={onDishTypeChange}
          />
        </div>
      ) : (
        <div className={style.headerInner}>
          <a className={style.logo} href="#">
            Dish <em>Galeria</em>
          </a>

          <SearchBar onChangeHandler={onSearchChange} />
          <Tag
            tabs={tabs}
            selectedDishType={selectedDishType}
            onClickTab={onDishTypeChange}
          />

          {user && <AuthUser user={user} logout={handleLogout} />}
        </div>
      )}
    </header>
  );
};

export default Header;
