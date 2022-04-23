import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./header.css";

import { Context } from "../../context/Context";
import SearchBar from "../searchbar/SearchBar";

export default function Header({ data }) {
  const [searchbarMenu, setSearchbarMenu] = useState(null)
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);

  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  const handleSearchBarmenu = () => {
    setSearchbarMenu(true)
  }

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
          <i className="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/about">
                SOBRE
              </Link>
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <img className="topImg" src={window.location.origin + '/' + user.avatar + '.png'} alt="" />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTRE-SE
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <SearchBar data={data} />
    </>
  );
}
