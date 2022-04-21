import React, { useState } from 'react'

import { Paper, InputBase, Grid, Link } from '@mui/material';

import './searchbar.css'

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
            direction="column"
            alignItems="center"
            justifyContent="center"
            marginTop={3}
        >
            <Grid item xs={4} width="60%">
                <Paper>
                    <InputBase onChange={handleFilter} sx={{ m: 1, fontSize: 22, pl: 2 }} placeholder="Busque Conhecimento" />
                </Paper>
                <div>
                    {filteredData.map((value) => {
                        return (
                            <a href={`/post/${value._id}`}>
                                <Paper className="dataResult">{value.title}</Paper>
                            </a>
                        )
                    })}
                </div>
            </Grid>
        </Grid>
    )
}

export default SearchBar