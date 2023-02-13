import { useMediaQuery } from "@mui/material";

import CategoriesBar from "../categoriesBar/CategoriesBar";
import CategoriesButton from "../categoriesButton/CategoriesButton";
import LargeScreenHeader from "./LargeScreenHeader";
import SmallScreenHeader from "./SmallScreenHeader";
import SearchBar from "../searchbar/SearchBar";
import SearchBarSmallScreen from "../searchbar/SearchBarSmallScreen";

export default function Header({ data }) {
  const isSmallScreen = useMediaQuery(
    "(min-width:100px) and (max-width:720px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width:721px) and (max-width:1086px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:1087px)");

  return (
    <>
      {isSmallScreen && (
        <>
          <SmallScreenHeader />
          <SearchBarSmallScreen data={data} />
          <CategoriesButton />
        </>
      )}
      {isMediumScreen && (
        <>
          <LargeScreenHeader />
          <SearchBar data={data} />
          <CategoriesButton />
        </>
      )}
      {isLargeScreen && (
        <>
          <LargeScreenHeader />
          <SearchBar data={data} />
          <CategoriesBar />
        </>
      )}
    </>
  );
}
