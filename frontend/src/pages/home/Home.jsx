import "./home.css";

export default function Home() {
  return (
    <>
      <div className="home">
        <img
          className="headerImg"
          src={window.location.origin + "/logo.png"}
          alt=""
        />
        {/* <LatestPost />
        <LikedstPost />
        <FavoritePost />
        <ComentedstPost /> */}
      </div>
    </>
  );
}
