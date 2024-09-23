import { Grid } from "@components/layout";
import { ScoreBoard } from "./score-board";
import { TurnBox } from "./turn-box";
import { useAppState } from "@contexts/use-app-state";
import { AppState } from "@/types";
import { Button } from "@components/button";
import { SetPeopleAction, SetAppStateAction } from "../../types";

export function Board() {
  const { appState, setPeople, setAppState } = useAppState();

  return (
    <Grid gap="4">
      <ScoreBoard />
      <TurnBox />
      {appState === AppState.COMPLETED && (
        <Button
          onClick={() => handleReset(setPeople, setAppState)}
          className="md:place-self-center"
        >
          Reset
        </Button>
      )}
    </Grid>
  );
}

function handleReset(
  setPeople: SetPeopleAction,
  setAppState: SetAppStateAction,
) {
  setPeople([]);
  setAppState(AppState.SETUP);
  localStorage.clear();
}
