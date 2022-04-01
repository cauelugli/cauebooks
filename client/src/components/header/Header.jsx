import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <img
        className="headerImg"
        src={window.location.origin + '/logo.png'}
        alt=""
      />
    </div>
  );
}
