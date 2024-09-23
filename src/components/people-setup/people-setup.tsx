import { Avatar } from "@components/avatar";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { Divider } from "@components/divider";
import { Input } from "@components/input";
import { Flex, Grid } from "@components/layout";
import { List } from "@components/list";
import { Heading, Text } from "@components/typography";
import { AppState, LocalStorageKey, PersonState, TPerson } from "@/types";
import { useAppState } from "@contexts/use-app-state";
import { Fragment, useState } from "react";
import { Bot } from "lucide-react";
import { setHasErrAction, setInputStateAction, TInputState } from "./types";
import { SetPeopleAction, SetAppStateAction } from "@/types";

export function PeopleSetup() {
  const { people, setPeople, setAppState } = useAppState();
  const [inputState, setInputState] = useState<TInputState>({
    value: "",
    hasError: false,
  });
  const [hasErr, setHasErr] = useState(false);

  return (
    <Grid gap="4">
      <Flex direction={"column"} gap="2">
        <Flex
          direction="column"
          gap="2"
          className="md:flex-row md:w-3/6 md:items-center"
        >
          <Input
            value={inputState.value}
            placeholder="Type a name..."
            onChange={(event) =>
              setInputState((prevState) => ({
                ...prevState,
                value: event.target.value,
              }))
            }
          />
          <Button
            onClick={() =>
              handleAddPerson(inputState, setPeople, setInputState)
            }
            className="shrink-0"
          >
            Add Person
          </Button>
        </Flex>
        {inputState.hasError && (
          <Text color="error">Please provide a name</Text>
        )}
      </Flex>
      <Card>
        <Grid gap="4">
          <Grid>
            <Heading size="2xl">Collegues</Heading>
            <Text size="sm">These people will go for lunch</Text>
          </Grid>
          <List.Root>
            {people.map((person) => {
              return (
                <Fragment key={person.id}>
                  <Divider />
                  <List.Item>
                    <Flex align="center" gap="4">
                      <Avatar>
                        <Bot />
                      </Avatar>
                      <Text>{person.name}</Text>
                    </Flex>
                  </List.Item>
                </Fragment>
              );
            })}
          </List.Root>
        </Grid>
      </Card>
      <Button
        onClick={() => handleStart(people, setPeople, setAppState, setHasErr)}
        className="md:place-self-start"
      >
        Start
      </Button>
      {hasErr && <Text color="error">You need at least two players</Text>}
    </Grid>
  );
}

function handleAddPerson(
  inputState: TInputState,
  setPeople: SetPeopleAction,
  setInputState: setInputStateAction,
) {
  const fieldValue = inputState.value.trim();

  if (!fieldValue) {
    setInputState((prevState) => ({ ...prevState, hasError: true }));
    return;
  }

  const id: string = self.crypto.randomUUID();

  const person = {
    id,
    name: fieldValue,
    roll: null,
    state: PersonState.IDLE,
  };

  setPeople((prevState) => {
    const updatedPeople = [...prevState, person];
    localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));

    return updatedPeople;
  });
  setInputState({ value: "", hasError: false });
}

function handleStart(
  people: TPerson[],
  setPeople: SetPeopleAction,
  setAppState: SetAppStateAction,
  setHasErr: setHasErrAction,
) {
  if (people.length < 2) {
    setHasErr(true);
    return;
  }

  setPeople((prevState) => {
    const activePerson = { ...prevState[0], state: PersonState.ACTIVE };
    const updatedPeople = [activePerson, ...prevState.slice(1)];
    localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));

    return updatedPeople;
  });

  setAppState(AppState.IN_PROGRESS);
  localStorage.setItem(LocalStorageKey.APP_STATE, AppState.IN_PROGRESS);
}
