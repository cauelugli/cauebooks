import React, { useState } from 'react'
import { Box, Paper, InputBase, Grid, Link } from '@mui/material';

const SearchBar = ({ data }) => {
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={4} width="50%">
                <Paper>
                    <InputBase onChange={handleFilter} sx={{ m: 1 }} placeholder="Procure por Textos" />
                </Paper>
                {filteredData.slice(0, 8).length != 0 &&
                    (<div>
                    {filteredData.map((value, key) => {
                     return (
                     <a href="/"> 
                        <p>{value.title}</p>
                    </a>)
                 })}
                </div>
                )}
            </Grid>
        </Grid>
    )
}

export default SearchBar