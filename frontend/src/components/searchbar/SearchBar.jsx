import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Paper, InputBase, Grid } from "@mui/material";

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
      paddingBottom={'2%'}
    >
      <Grid item xs={4} width="60%">
        <Paper>
          <InputBase
            onChange={handleFilter}
            fullWidth
            sx={{ m: 1, ml:2, fontSize: 20, p: '1%', fontFamily: "Varela Round, sans-serif"}}
            placeholder="BUSQUEM CONHECIMENTO"
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
