import "./home.css";

// import Posts from "../../components/posts/Posts";

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
