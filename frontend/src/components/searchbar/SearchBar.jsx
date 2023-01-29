import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Paper, InputBase, Grid, Link } from "@mui/material";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = posts.filter((value) => {
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
      margin={3}
      paddingBottom={"2%"}
      onMouseLeave={() => setFilteredData([])}
    >
      <Grid item xs={4} width="60%" sx={{}} >
        <Paper>
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
        <Paper sx={{ zIndex: 1, position: "absolute", mt: 0.5 }}>
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
