import { useCallback, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import Router from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  border: "solid 1px",
  // marginLeft: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // width: "0ch",
      width: "12ch",
      "&:focus": {
        // width: "20ch",
        width: "100%",
      },
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    },
    // [theme.breakpoints.up("xs")]: {
    //   fontSize: "1rem"
    // }
    fontSize: "1rem"
  },
}));

export default function SearchInput() {
  const [search, setSearch] = useState("")
  const currentSearchWord = useCallback(e => {
    const { value } = e.currentTarget;
    setSearch(value)
  }, [setSearch])
  const handleChangeKeyword = useCallback(() => {
    Router.push({
      pathname: '/search-coin',
      query: { keyword: search }
    })
  }, [search])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="Search"
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={currentSearchWord}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            // エンターキー押下時の処理
            handleChangeKeyword()
          }
        }}
      />
    </Search>
  );
}
