import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { MySearch } from '../../pages/dashboard';

const useStyles = makeStyles((theme) => ({
  searchField: {
    marginRight: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useContext(MySearch)

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search submission here
    console.log(searchValue);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className='form-cont'>
        <input type='text' name='search' placeholder='Search' value={searchValue} onChange={handleSearchChange} className='searchfield' /><IconButton type="submit"><SearchIcon fontSize='small'/></IconButton>
      </div>
    </form>
  );
}

export default SearchBar;
