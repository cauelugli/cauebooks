import { useContext, useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  ButtonBase,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";

import { Context } from "../../context/Context";

export default function Favorites() {
  // eslint-disable-next-line
  const { user } = useContext(Context);
  const [likesList, setLikesList] = useState("");
  const [favoritesList, setFavoritesList] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedNameToDelete, setSelectedNameToDelete] = useState("");
  const [selectedIdToDelete, setSelectedIdToDelete] = useState("");

  useEffect(() => {
    const getFavorites = async () => {
      const res = await axios.get("/users/" + user._id);
      setLikesList(res.data.likesList);
      setFavoritesList(res.data.favoritesList);
    };
    getFavorites();
  }, [user, likesList]);

  const handleMouseEnter = (id, name) => {
    setSelectedNameToDelete(name);
    setSelectedIdToDelete(id);
    setShowButton({ ...showButton, [id]: true });
  };

  const handleMouseLeave = (id, name) => {
    setShowButton({ ...showButton, [id]: false });
  };

  const handleDeleteConfirmation = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.put("/users/unfavorite/" + user._id, {
        favorites: selectedNameToDelete,
        id: selectedIdToDelete,
      });
      await axios.put("/posts/" + selectedIdToDelete, {"$inc": { "favorites": -1 } });
      setOpenDeleteModal(false);
      alert("Unfavorited");
    } catch (err) {
      setOpenDeleteModal(false);
      alert("Not Unfavorited =/");
      console.log(err);
    }
  };

  const finalFavoritesList = [];
  const finalLikesList = [];

  for (let i = 0; i < favoritesList.length; i++) {
    finalFavoritesList.push(
      <Typography>
        <ButtonBase
          key={favoritesList[i].id}
          onMouseEnter={() => handleMouseEnter(favoritesList[i].id, favoritesList[i].name)}
          onMouseLeave={() => handleMouseLeave(favoritesList[i].id, favoritesList[i].name)}
        >
          <Link
            href={`/post/${favoritesList[i].id}`}
            underline="none"
            color="grey.700"
          >
            {favoritesList[i].name}
          </Link>
          {showButton[favoritesList[i].id] && (
            <Button
              onClick={handleDeleteConfirmation}
              variant="contained"
              color="error"
              sx={{ height: "1.5em", width: "3px", marginLeft: "1.5em" }}
            >
              &#9003;
            </Button>
          )}
        </ButtonBase>
      </Typography>
    );
  }

  for (let i = 0; i < likesList.length; i++) {
    finalLikesList.push(
      <Typography>
        <Link
          href={`/post/${likesList[i].id}`}
          underline="none"
          color="grey.700"
        >
          {likesList[i].name}
        </Link>
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: "2%",
      }}
    >
      <Box
        sx={{
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "75%",
        }}
      >
        <CardContent>
          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.700", m: "2%" }}
          >
            Posts Favoritos &#11088;
          </Typography>
          <Box
            sx={{
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.300",
              borderRadius: 3,
              padding: 2,
            }}
          >
            {finalFavoritesList}
          </Box>

          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.700", m: "2%" }}
          >
            Posts Curtidos &#9829;
          </Typography>
          <Box
            sx={{
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.300",
              borderRadius: 3,
              padding: 2,
            }}
          >
            {finalLikesList}
          </Box>
        </CardContent>
      </Box>

      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Remover Favorito?</DialogTitle>
        <DialogActions>
          <Button variant="inherit" onClick={handleCloseDeleteModal}>
            Nahh
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
