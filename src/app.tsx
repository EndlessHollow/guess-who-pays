import { Board } from "@components/board";
import { Grid } from "@components/layout";
import { PeopleSetup } from "@components/people-setup";
import { Heading } from "@components/typography";
import { AppState } from "@/types";
import { useAppState } from "@contexts/use-app-state";

export function App() {
  const { appState } = useAppState();

  return (
    <Grid gap="8" className="container mx-auto py-10 px-8  auto-rows-min">
      <Heading size="3xl">Who is the unlucky one</Heading>
      {appState === AppState.SETUP && <PeopleSetup />}
      {appState === AppState.IN_PROGRESS && <Board />}
    </Grid>
  );
}
