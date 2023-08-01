import React from "react";
import { useMediaQuery } from "@mui/material";

import CommentaryBoxLargeScreen from "./CommentaryBoxLargeScreen";
import CommentaryBoxSmallScreen from "./CommentaryBoxSmallScreen";

export default function Home() {
  const isSmallScreen = useMediaQuery(
    "(min-width:100px) and (max-width:720px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width:721px) and (max-width:1086px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:1087px)");

  return (
    <>
      {isSmallScreen && <CommentaryBoxSmallScreen />}
      {isMediumScreen && <CommentaryBoxLargeScreen />}
      {isLargeScreen && <CommentaryBoxLargeScreen />}
    </>
  );
}
