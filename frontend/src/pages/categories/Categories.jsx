import React from "react";

import { useMediaQuery } from "@mui/material";
import CategoriesSmallScreen from "./CategoriesSmallScreen";
import CategoriesLargeScreen from "./CategoriesLargeScreen";

const Categories = () => {
  const isSmallScreen = useMediaQuery(
    "(min-width:100px) and (max-width:720px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width:721px) and (max-width:1086px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:1087px)");

  return (
    <>
      {isSmallScreen && <CategoriesSmallScreen />}
      {isMediumScreen && <CategoriesLargeScreen />}
      {isLargeScreen && <CategoriesLargeScreen />}
    </>
  );
};

export default Categories;
