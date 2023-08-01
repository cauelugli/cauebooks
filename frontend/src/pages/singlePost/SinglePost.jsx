import { useMediaQuery } from "@mui/material";

import SinglePostLargeScreen from "./SinglePostLargeScreen";
import SinglePostSmallScreen from "./SinglePostSmallScreen";

export default function SinglePost() {
  const isSmallScreen = useMediaQuery(
    "(min-width:100px) and (max-width:720px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width:721px) and (max-width:1086px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:1087px)");

  return (
    <>
      {isSmallScreen && <SinglePostSmallScreen />}
      {isMediumScreen && <SinglePostLargeScreen />}
      {isLargeScreen && <SinglePostLargeScreen />}
    </>
  );
}
