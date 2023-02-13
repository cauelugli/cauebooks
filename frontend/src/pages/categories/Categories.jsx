import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";

import { Box, Grid, Typography } from "@mui/material";

const Categories = () => {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("/posts");
      const data2 = await axios.get("/categories");

      const foundObject = data2.data.find(
        (object) => object._id === categoryId
      );

      setCategoryName(foundObject);
      const categoryIconConcat = " &#" + foundObject.icon + ";";
      setCategoryIcon(categoryIconConcat);

      setPosts(
        data.posts.filter((post) =>
          post.categories.some((category) => category._id === categoryId)
        )
      );
    };
    getPosts();
  }, [categoryId]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        p: 5,
        m: 5,
        color: "#0E1428",
        border: "3px solid",
        backgroundColor: "#f1f1f0e3",
        borderColor: "grey.400",
        borderRadius: 3,
        width: "80%",
      }}
    >
      <Grid container direction="row" justifyContent="" sx={{ m: 1 }}>
        <Typography variant="h4">Categoria</Typography>
        <Typography variant="h4" sx={{ mx: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: categoryIcon }} />
        </Typography>
        <Typography variant="h4">{categoryName.name}</Typography>
      </Grid>
      {posts.map((post) => (
        <Box
          sx={{
            p: 2,
            m: 2,
            mt: 4,
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
            width: "50%",
          }}
        >
          <div key={post.id}>
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "#2e2e2e" }}
            >
              <h2>{post.title}</h2>
            </Link>
          </div>
        </Box>
      ))}
    </Grid>
  );
};

export default Categories;
