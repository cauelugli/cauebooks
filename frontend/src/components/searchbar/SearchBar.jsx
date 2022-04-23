import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import { Paper, InputBase, Grid } from "@mui/material";

import "./searchbar.css";

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
      marginTop={3}
    >
      <Grid item xs={4} width="60%">
        <Paper>
          <InputBase
            onChange={handleFilter}
            sx={{ m: 1, fontSize: 22, pl: 2 }}
            placeholder="Busque Conhecimento"
          />
        </Paper>
        <div>
          {filteredData.map((posts) => {
            return (
              <a href={`/post/${posts._id}`}>
                <Paper className="dataResult">{posts.title}</Paper>
              </a>
            );
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
