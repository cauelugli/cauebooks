import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import CategoriesBar from "../categoriesBar/CategoriesBar";

import SearchBar from "../searchbar/SearchBar";
import SettingsMenu from "../settingsMenu/SettingsMenu";

export default function Header({ data }) {
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);

  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  return (
    <>
      <div className="header">
        {/* This ghost will have something one day  */}
        <div id="ghost_div" className="headerLeft"></div>

        <div className="headerCenter">
          <ul className="headerList">
            <li className="headerListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="headerListItem">
              <Link className="link" to="/about">
                SOBRE
              </Link>
            </li>
          </ul>
        </div>

        <div className="headerRight">
          <SettingsMenu />
        </div>

      </div>
      <SearchBar data={data} />
      <CategoriesBar />
    </>
  );
}
