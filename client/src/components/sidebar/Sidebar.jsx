import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">SOBRE O AVENTUREIRO</span>
        <img
          style={{width: '50%'}}
          src="https://yt3.ggpht.com/ytc/AKedOLQl0uQBCQfpONKQTYjqZw28Mhf-qGvlpmlEwFP-nA=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <p>
          Fala dele. Fala quem é ele. Cê sabe? Nem eu. Mas é ele! Menino Poka! Não possui muito mais do que um sonho, e uma baita vontade de viver.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">SOCIAL</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
