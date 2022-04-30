import { Link } from "react-router-dom";

import CategoriesBar from "../categoriesBar/CategoriesBar";
import SearchBar from "../searchbar/SearchBar";
import SettingsMenu from "../settingsMenu/SettingsMenu";

export default function Header({ data }) {
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
