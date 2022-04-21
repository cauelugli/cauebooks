import SearchBar from "../searchbar/SearchBar";
import "./header.css";

export default function Header({data}) {
  return (
    <>
      <SearchBar data={data} />
      <div className="header">
        <img
          className="headerImg"
          src={window.location.origin + '/logo.png'}
          alt=""
        />
      </div>
    </>
  );
}
