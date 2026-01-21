import { Roll } from "../types";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { DieDisplay } from "./DieDisplay";

import tengwarIcon from "../assets/tengwar_icon.png";

interface RollDisplayProps {
  roll: Roll;
}

export function RollDisplay(props: RollDisplayProps) {
  const roll = props.roll;
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={3}>
        <Stack direction="column" spacing={0}>
          <Typography variant="caption">{roll.label}</Typography>
          <Divider sx={{ margin: "4px 0" }} />
          <Typography variant="caption">
            Total: {roll.sum}
            {roll.successIcons > 0 ? ", " : ""}
            {Array.from(Array(roll.successIcons).keys()).map(() => (
              <img src={tengwarIcon} height="12" />
            ))}
          </Typography>
          <Typography variant="caption">
            Weary: {roll.wearySum}
            {roll.successIcons > 0 ? ", " : ""}
            {Array.from(Array(roll.successIcons).keys()).map(() => (
              <img src={tengwarIcon} height="12" />
            ))}
          </Typography>
        </Stack>
      </Grid>
      <Grid size={9}>
        <Stack direction="row" spacing={1}>
          {roll.featFaces.map((face, index) => (
            <DieDisplay
              face={face}
              feat={true}
              key={`roll-${roll.id}-die-${index}`}
              selected={index == roll.featIndex}
            />
          ))}
          {roll.successFaces.map((face, index) => (
            <DieDisplay
              face={face}
              feat={false}
              key={`roll-${roll.id}-die-${index}`}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
