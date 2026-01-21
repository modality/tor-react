import "@fontsource-variable/open-sans/wght.css";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Stack } from "@mui/material";
import { useState } from "react";

import { RollDisplay } from "./components/RollDisplay";
import { Header } from "./features/Header";

import { Roll } from "./types";

let theme = createTheme({
  typography: {
    fontFamily: `"Open Sans Variable", "Arial", sans-serif`,
    h3: {
      fontFamily: `"Optima", "Times New Roman", serif`,
      fontStyle: "italic",
      letterSpacing: "-2px",
      // fontWeight: "bold",
    },
    h4: {
      fontFamily: `"Optima", "Times New Roman", serif`,
      fontStyle: "italic",
      letterSpacing: "-1px",
      // fontWeight: "bold",
    },
  },
});

function createRoll(
  id: number,
  label: string,
  featDice: number,
  successDice: number,
  illFavoured: boolean
): Roll {
  const featDie = ["E", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "G"];
  const successDie = ["1", "2", "3", "4", "5", "6"];
  const featFaces = Array.from(Array(featDice).keys()).map(() => {
    const index = Math.floor(Math.random() * featDie.length);
    return featDie[index];
  });
  const successFaces = Array.from(Array(successDice).keys()).map(() => {
    const index = Math.floor(Math.random() * successDie.length);
    return successDie[index];
  });

  let featIndex = -1;

  const featValue = featFaces.reduce(
    (accum, el, index) => {
      if (illFavoured) {
        if (el == "E") {
          featIndex = index;
          return 0;
        } else {
          const parsed = parseInt(el);
          if (!isNaN(parsed)) {
            if (parsed < accum) {
              featIndex = index;
            }
            return Math.min(accum, parsed);
          }
        }
      } else {
        if (el == "G") {
          featIndex = index;
          return 10;
        } else {
          const parsed = parseInt(el);
          if (!isNaN(parsed)) {
            if (parsed > accum) {
              featIndex = index;
            }
            return Math.max(accum, parsed);
          }
        }
      }
      return accum;
    },
    illFavoured ? 10 : 0
  );

  const sum = successFaces.reduce((accum, el) => {
    const parsed = parseInt(el);
    if (!isNaN(parsed)) {
      return accum + parsed;
    }
    return accum;
  }, featValue);

  const wearySum = successFaces.reduce((accum, el) => {
    const parsed = parseInt(el);
    if (!isNaN(parsed) && parsed > 3) {
      return accum + parsed;
    }
    return accum;
  }, featValue);

  const successIcons = successFaces.reduce((accum, el) => {
    if (el == "6") {
      return accum + 1;
    }
    return accum;
  }, 0);

  return {
    id,
    label: label === "" ? `Roll #${id}` : label,
    featIndex,
    featDice,
    successDice,
    featFaces,
    successFaces,
    gandalf: featFaces.includes("G"),
    sum,
    wearySum,
    successIcons,
  };
}

function App() {
  const [id, setId] = useState(1);
  /*
  const firstRoll: Roll = {
    featDice: 3,
    successDice: 6,
    featFaces: ["G", "E"],
    successFaces: ["1", "2", "3", "4", "5", "6"],
    gandalf: true,
    sum: 31,
    wearySum: 10,
    successIcons: 2,
  };*/
  const [rolls, setRolls] = useState<Roll[]>([
    /* firstRoll */
  ]);

  const doRoll = function (
    label: string,
    featCount: number,
    successCount: number,
    illFavoured: boolean
  ) {
    const roll = createRoll(id, label, featCount, successCount, illFavoured);
    setId(id + 1);
    setRolls([roll, ...rolls]);
  };

  const doClear = function () {
    setId(1);
    setRolls([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          padding: "1em",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Header onRoll={doRoll} onClear={doClear} />
          {rolls.map((roll) => (
            <RollDisplay key={`roll-${roll.id}`} roll={roll} />
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
