import React from 'react'

import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ComputerIcon from '@mui/icons-material/Computer';
import DangerousIcon from '@mui/icons-material/Dangerous';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupIcon from '@mui/icons-material/Group';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import SpaIcon from '@mui/icons-material/Spa';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const HomeAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{color: "#BDEFD8", backgroundColor:"#0E1428"}}>

        <Typography variant="h6"sx={{mr:4}}>Categorias</Typography>

        <Button color="inherit" startIcon={<DangerousIcon />} sx={{mx:1}}>É um Erro</Button>

        <Button color="inherit" startIcon={<SportsSoccerIcon />} sx={{mx:1}}>Esportes</Button>
        
        <Button color="inherit" startIcon={<FamilyRestroomIcon />} sx={{mx:1}}>Família</Button>

        <Button color="inherit" startIcon={<AccountBalanceIcon />} sx={{mx:1}}>Filosofia</Button>

        <Button color="inherit" startIcon={<SpaIcon />} sx={{mx:1}}>Natureza</Button>

        <Button color="inherit" startIcon={<NaturePeopleIcon />} sx={{mx:1}}>Pessoal</Button>

        <Button color="inherit" startIcon={<AccessibilityNewIcon />} sx={{mx:1}}>Ser Humano</Button>

        <Button color="inherit" startIcon={<GroupIcon />} sx={{mx:1}}>Sociedade</Button>

        <Button color="inherit" startIcon={<ComputerIcon />} sx={{mx:1}}>Tecnologia</Button>

        <Button color="inherit" startIcon={<SportsBarIcon />} sx={{mx:1}}>Brisas Fortes</Button>


      </Toolbar>
    </AppBar>
  )
}

export default HomeAppBar