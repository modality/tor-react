import { Paper, Typography } from "@mui/material";
// import { Face } from "../types";

import eyeIcon from "../assets/eye_icon.png";
import gandalfIcon from "../assets/gandalf_icon.png";
import tengwarIcon from "../assets/tengwar_icon.png";

interface DieDisplayProps {
  face: string;
  feat: boolean;
  selected?: boolean;
}

export function DieDisplay(props: DieDisplayProps) {
  // text-stroke
  const parsed = parseInt(props.face);
  const baseStyles = {
    fontSize: "36px",
    lineHeight: "27px",
    padding: "0",
    paddingTop: "6px",
    textAlign: "center",
  };
  let outline = false;
  let strong = false;
  let display = <Typography>{props.face}</Typography>;

  let variant: "elevation" | "outlined" = "elevation";
  let background = "linen";
  let color = "black";

  if (props.feat && !props.selected) {
    variant = "outlined";
    background = "white";
    color = "lightgray";
  }

  if (!isNaN(parsed)) {
    outline = !props.feat && [1, 2, 3].includes(parsed);
    strong = !props.feat && parsed == 6;

    display = (
      <Typography
        sx={{
          ...baseStyles,
          fontWeight: outline ? "bold" : "normal",
          "-webkit-text-stroke": outline ? "1px black" : "unset",
          color: outline ? "white" : color,
        }}
      >
        {props.face}
        {strong && (
          <img src={tengwarIcon} height="12" style={{ verticalAlign: "top" }} />
        )}
      </Typography>
    );
  } else if (props.face === "G") {
    display = (
      <Typography sx={{ ...baseStyles }}>
        <img src={gandalfIcon} height="27" />
      </Typography>
    );
  } else if (props.face === "E") {
    display = (
      <Typography sx={{ ...baseStyles }}>
        <img src={eyeIcon} height="27" />
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        padding: "0.5em",
        width: "40px",
        height: "40px",
        backgroundColor: props.feat ? background : "",
        color: color,
      }}
      variant={variant}
    >
      {display}
    </Paper>
  );
}
