import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Box, CardContent, Divider, Typography } from "@mui/material";

import { Context } from "../../context/Context";

export default function Favorites() {
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getFavorites = async () => {
        console.log(user._id)
      const res = await axios.get("/" + user._id + "/favorites");
      setCategories(res.data.categories);
      setBody(res.data.body);
    };
    getFavorites();    
  }, [user]);

  let categoriesList = "";
  if (categories) {
    categories.forEach(myFunction);

    function myFunction(item) {
      // try to render the components, maybe will fuck the shit up... but anyway...
      categoriesList += item + " "; 
    }
  }

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", my: "2%"}}>
      <Box
        sx={{
          display: "flex",
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "75%",
        }}
      >
        
        <CardContent>
          <Box sx={{display: "flex", margin: "5%"}}>
            
              <Typography sx={{color: "grey.800"}}>
                Favorites: {user.favorites}
              </Typography>
              <Divider />
            
              <Typography sx={{color: "grey.800"}}>
                body: {body}
              </Typography>
              <Divider />
            
              <Typography sx={{color: "grey.800"}}>
                categoriesList: {categoriesList}
              </Typography>
                         
          </Box>
        </CardContent>

      </Box>
    </Box>
  );
}
