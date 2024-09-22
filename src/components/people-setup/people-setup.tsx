import { Avatar } from "@components/avatar";
import { Button } from "@components/button";
import { Card } from "@components/card";
import { Divider } from "@components/divider";
import { Input } from "@components/input";
import { Flex, Grid } from "@components/layout";
import { List } from "@components/list";
import { Heading, Text } from "@components/typography";
import { AppState, PersonState, TPerson } from "@/types";
import { useAppState } from "@contexts/use-app-state";
import { Dispatch, Fragment, useState } from "react";
import { Bot } from "lucide-react";
import { TInputState } from "./types";

export function PeopleSetup() {
  const { people, setPeople, setAppState } = useAppState();
  const [inputState, setInputState] = useState<TInputState>({
    value: "",
    hasError: false,
  });

  return (
    <Grid gap="4">
      <Flex direction={"column"} gap="2">
        <Flex
          direction="column"
          gap="2"
          className="lg:flex-row lg:w-3/6 lg:items-center"
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
        onClick={() => handleStart(setAppState)}
        className="place-self-center lg:place-self-start"
      >
        Start
      </Button>
    </Grid>
  );
}

function handleAddPerson(
  inputState: TInputState,
  setPeople: Dispatch<React.SetStateAction<TPerson[]>>,
  setInputState: Dispatch<React.SetStateAction<TInputState>>,
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
    score: null,
    state: PersonState.IDLE,
  };
  setPeople((prevState) => [...prevState, person]);
  localStorage.setItem(id, JSON.stringify(person));
  setInputState({ value: "", hasError: false });
}

function handleStart(setAppState: Dispatch<React.SetStateAction<AppState>>) {
  setAppState(AppState.IN_PROGRESS);
  localStorage.setItem("app-state", AppState.IN_PROGRESS);
}
