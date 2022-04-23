import { Link } from "react-router-dom";

import "./post.css";

import { Card } from '@mui/material';

export default function Post({ post }) {
  return (
    <Card className="post" elevation={3}>
      <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle">{post.title}</span>
      </Link>
      <hr/>
      <span className="postDate">
        {new Date(post.createdAt).toDateString()}
      </span>
      <p className="postDesc">{post.desc}</p>
    </Card>
  );
}
