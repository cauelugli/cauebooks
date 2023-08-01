import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Paper, InputBase, Grid, Link } from "@mui/material";

const api = axios.create({
  baseURL: (process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await api.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = posts.posts.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ my: 4 }}
      onMouseLeave={() => setFilteredData([])}
    >
      <Grid width="50%">
        <Paper sx={{ borderRadius: 3 }}>
          <InputBase
            onChange={handleFilter}
            fullWidth
            sx={{
              m: 1,
              ml: 2,
              fontSize: 20,
              p: "1%",
              color: "gray",
              fontFamily: "Roboto, sans-serif",
            }}
            placeholder='👾: -"BUSQUEM CONHECIMENTO!"'
          />
        </Paper>
        <Paper
          sx={{ zIndex: 1, position: "absolute", mt: 0.1, minWidth: "300px" }}
        >
          {filteredData.map((posts) => {
            return (
              <Link href={`/post/${posts._id}`} sx={{ textDecoration: "none" }}>
                <Paper
                  sx={{ marginTop: "5px", padding: "10px", color: "gray" }}
                >
                  {posts.title}
                </Paper>
              </Link>
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
