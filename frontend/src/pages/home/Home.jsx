// import { useEffect, useState } from "react";
// import { useLocation } from "react-router";
// import axios from "axios";

import "./home.css";

// import Posts from "../../components/posts/Posts";


export default function Home() {
  // const [posts, setPosts] = useState([]);
  // const { search } = useLocation();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get("/posts" + search);
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [search]);

  return (
    <>
      <div className="home">
        {/* <Posts posts={posts} /> */}
        {/* <LatestPost />
        <LikedstPost />
        <FavoritePost />
        <ComentedstPost /> */}
      </div>
    </>
  );
}
