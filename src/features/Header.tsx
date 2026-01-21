import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

import featDie from "../assets/feat_die.png";
import successDie from "../assets/success_die.png";

type RollFunction = (
  label: string,
  featCount: number,
  successCount: number,
  illFavoured: boolean
) => void;

type ClearFunction = () => void;

interface HeaderProps {
  onRoll: RollFunction;
  onClear: ClearFunction;
}

export function Header(props: HeaderProps) {
  const onRoll = props.onRoll;
  const [label, setLabel] = useState("");
  const [featCount, setFeatCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const incrFeatCount = function () {
    setFeatCount(featCount + 1);
  };

  const decrFeatCount = function () {
    if (featCount > 0) {
      setFeatCount(featCount - 1);
    }
  };
  const incrSuccessCount = function () {
    setSuccessCount(successCount + 1);
  };

  const decrSuccessCount = function () {
    if (successCount > 0) {
      setSuccessCount(successCount - 1);
    }
  };

  const doRoll = function () {
    if (featCount > 0 || successCount > 0) {
      onRoll(label, featCount, successCount, false);
    }
  };

  const doIllFavouredRoll = function () {
    if (featCount > 0 || successCount > 0) {
      onRoll(label, featCount, successCount, true);
    }
  };

  const disabledRoll = featCount === 0 && successCount === 0;

  const labelChange = function (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setLabel(event.target.value);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={0}>
        <IconButton size="small" onClick={incrFeatCount}>
          <img src={featDie} alt="feat die" />
        </IconButton>
        <IconButton size="small" onClick={incrSuccessCount}>
          <img src={successDie} alt="success die" />
        </IconButton>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          padding: "1em",
          backgroundColor: "lightgray",
          minHeight: "60px",
          background:
            "linear-gradient(0deg,rgba(204, 204, 204, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(204, 204, 204, 1) 100%);",
        }}
      >
        <Stack direction="row" justifyContent="left" spacing={0}>
          {Array.from(Array(featCount).keys()).map(() => (
            <IconButton size="small" onClick={decrFeatCount}>
              <img src={featDie} width="50" alt="feat die" />
            </IconButton>
          ))}
          {Array.from(Array(successCount).keys()).map(() => (
            <IconButton size="small" onClick={decrSuccessCount}>
              <img src={successDie} width="50" alt="success die" />
            </IconButton>
          ))}
        </Stack>
      </Paper>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            id="outlined-basic"
            label="Label the roll"
            variant="outlined"
            size="small"
            onChange={labelChange}
          />
        </Grid>
        <Grid size={8}>
          <Stack direction="row" justifyContent="left" spacing={1}>
            <Button
              variant="contained"
              onClick={doRoll}
              disabled={disabledRoll}
            >
              Roll It!
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={doIllFavouredRoll}
              disabled={disabledRoll}
            >
              Roll Ill-favoured
            </Button>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack direction="row" justifyContent="right">
            <Button variant="outlined" color="error" onClick={props.onClear}>
              Clear History
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
