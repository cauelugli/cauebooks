import React, { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const names = ['Oliver Hansen', 'Van Henry', 'April Tucker'];

export default function CheckboxesGroup() {
  const [categories, setCategories] = useState([]);

  const handleChangeCheckboxes = (event) => {
    const {target: { value },} = event;
    setCategories(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          multiple
          value={categories}
          onChange={handleChangeCheckboxes}
          renderValue={(selected) => selected.join(', ')}
        >
          {names.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
