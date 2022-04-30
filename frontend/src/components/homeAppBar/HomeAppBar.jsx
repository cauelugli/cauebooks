import React from 'react'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article';

const HomeAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{color: "#0E1428"}}>
        <IconButton color="inherit" edge="start" sx={{m:1}}>
          <ArticleIcon />
        </IconButton>
        <Typography variant="h6"sx={{mr:3}}>Categorias</Typography>
        <Button color="inherit" sx={{mx:1}}>Natureza</Button>
        <Button color="inherit" sx={{mx:1}}>Ser Humano</Button>
        <Button color="inherit" sx={{mx:1}}>Sociedade</Button>
        <Button color="inherit" sx={{mx:1}}>Família</Button>
        <Button color="inherit" sx={{mx:1}}>Pessoal</Button>
        <Button color="inherit" sx={{mx:1}}>Filosofia</Button>
        <Button color="inherit" sx={{mx:1}}>Tecnologia</Button>
        <Button color="inherit" sx={{mx:1}}>Brisas Fortes</Button>
        <Button color="inherit" sx={{mx:1}}>Esportes</Button>
        <Button color="inherit" sx={{mx:1}}>É um Erro</Button>
      </Toolbar>
    </AppBar>
  )
}

export default HomeAppBar