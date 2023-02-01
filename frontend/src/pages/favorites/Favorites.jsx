import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import axios from "axios";

import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Context } from "../../context/Context";

export default function Favorites() {
  // eslint-disable-next-line
  const { user } = useContext(Context);
  const [likesList, setLikesList] = useState("");
  const [favoritesList, setFavoritesList] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedNameToDelete, setSelectedNameToDelete] = useState("");
  const [selectedIdToDelete, setSelectedIdToDelete] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await axios.get("/users/" + user._id);
      setLikesList(res.data.likesList);
      setFavoritesList(res.data.favoritesList);
    };
    getFavorites();
  });

  const handleDeleteConfirmation = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleClick = (event, index, name) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    setSelectedIdToDelete(index);
    setSelectedNameToDelete(name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleDelete = async () => {
    try {
      await axios.put("/users/unfavorite/" + user._id, {
        favorites: selectedNameToDelete,
        id: selectedIdToDelete,
      });
      await axios.put("/posts/unfavorite/" + selectedIdToDelete);
      setOpenDeleteModal(false);
    } catch (err) {
      setOpenDeleteModal(false);
      console.log(err);
    }
  };

  const finalFavoritesList = [];
  const finalLikesList = [];

  for (let i = 0; i < favoritesList.length; i++) {
    finalFavoritesList.push(
      <>
        <Typography key={favoritesList[i].id}>
          <Button
            aria-controls={`simple-menu-${favoritesList[i].id}`}
            sx={{
              textTransform: "none",
              color: "grey.800",
              "&:hover": { backgroundColor: "grey.300" },
            }}
            aria-haspopup="true"
            onClick={(event) =>
              handleClick(event, favoritesList[i].id, favoritesList[i].name)
            }
          >
            {favoritesList[i].name}
          </Button>
          <Menu
            id={`simple-menu-${favoritesList[i].id}`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl) && selectedIndex === favoritesList[i].id}
            onClose={handleClose}
          >
            <MenuItem
              sx={{
                color: "grey.800",
                backgroundColor: "#fff",
                "&:hover": { color: "#fff ",
                backgroundColor: "grey.800", },
              }}
              component={RouterLink}
              to={`/post/${favoritesList[i].id}`}
              onClick={handleClose}
            >
              <VisibilityIcon sx={{ mr: 1 }} /> Ver Post
            </MenuItem>
            <MenuItem
              sx={{
                color: "grey.800",
                backgroundColor: "#fff",
                "&:hover": { color: "#fff", backgroundColor: "red" },
              }}
              onClick={() =>
                handleDeleteConfirmation(
                  favoritesList[i].id,
                  favoritesList[i].name
                )
              }
              onClose={handleClose}
            >
              <DeleteIcon sx={{ mr: 1 }} /> Remover
            </MenuItem>
          </Menu>
        </Typography>
      </>
    );
  }

  for (let i = 0; i < likesList.length; i++) {
    finalLikesList.push(
      <MenuItem
        sx={{
          textTransform: "none",
          color: "grey.800",
          "&:hover": { backgroundColor: "grey.300" },
        }}
        component={RouterLink}
        to={`/post/${likesList[i].id}`}
        onClick={handleClose}
      >
        {likesList[i].name}
      </MenuItem>
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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.800", m: "2%" }}
          >
            Posts Favoritos &#11088;
          </Typography>
          <Box
            id="1"
            sx={{
              width: "75%",
              color: "#0E1428",
              border: "2px solid",
              backgroundColor: "#fff",
              borderColor: "grey.400",
              borderRadius: 3,
              padding: 2,
            }}
          >
            {finalFavoritesList}
          </Box>

          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.800", m: "2%" }}
          >
            Posts Curtidos &#9829;
          </Typography>
          <Box
            id="1"
            sx={{
              width: "75%",
              color: "#0E1428",
              border: "2px solid",
              backgroundColor: "#fff",
              borderColor: "grey.400",
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
