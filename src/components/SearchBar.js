import React from 'react';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import * as actions from 'actions';

// Redux
import { connect } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = (props) => {
  const removeSpecialCharacter = (str) => {
    const noSpecialCharacters = str.replace(/[^a-zA-Z0-9 ]/g, '');
    return noSpecialCharacters;
  };
  const convertStringtoTags = (str) => {
    const tags = str.replace(/ /g, ',');
    return tags;
  };

  const handleChange = (event) => {
    // Trigger when user press enter key
    if (event.keyCode === 13) {
      let tagsString = event.target.value;
      tagsString = removeSpecialCharacter(tagsString);
      tagsString = convertStringtoTags(tagsString);
      props.getImages(tagsString);
    }
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onKeyDown={(event) => handleChange(event)}
        placeholder='Search Here…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default connect(null, actions)(SearchBar);
