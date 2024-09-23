import { Card } from "@components/card";
import { Grid } from "@components/layout";
import { Heading, Text } from "@components/typography";
import { Button } from "@components/button";
import { useState } from "react";
import { useAppState } from "@contexts/use-app-state";
import { AppState, LocalStorageKey, PersonState, TPerson } from "@/types";
import { SetPeopleAction, SetAppStateAction } from "@/types";
import { setRollNumberAction } from "./types";

export function TurnBox() {
  const { people, appState, setPeople, setAppState } = useAppState();

  const [rollNumber, setRollNumber] = useState<number | null>(null);

  const activePerson = getCurrentPerson(people) || getNextPerson(people);

  const getHeadingText = () => {
    if (appState === AppState.COMPLETED) {
      const loser = people.find((person) => person.state === PersonState.LOST);
      return `${loser?.name} lost the game!`;
    }
    return activePerson
      ? `It is ${activePerson.name}'s turn:`
      : "Game in progress";
  };

  return (
    <Card>
      <Grid justify="center" gap="4">
        <Grid>
          <Heading as="h3" size="2xl">
            {getHeadingText()}
          </Heading>
          {appState === AppState.IN_PROGRESS && (
            <Text align="center">{!rollNumber ? "?" : rollNumber}</Text>
          )}
        </Grid>

        {appState === AppState.IN_PROGRESS && (
          <Button
            onClick={() =>
              handleRoll(setPeople, setRollNumber, setAppState, activePerson)
            }
          >
            Roll
          </Button>
        )}
      </Grid>
    </Card>
  );
}

function getCurrentPerson(people: TPerson[]) {
  return people.find((person) => person.state === PersonState.ACTIVE);
}

function getNextPerson(people: TPerson[]) {
  return people.find(
    (person) => person.state === PersonState.IDLE && person.roll === null,
  );
}

function handleRoll(
  setPeople: SetPeopleAction,
  setRollNumber: setRollNumberAction,
  setAppState: SetAppStateAction,
  activePerson?: TPerson,
) {
  if (!activePerson) return;

  const roll = Math.floor(Math.random() * 4) + 1;
  setRollNumber(roll);

  setPeople((prevPeople) => {
    const updatedPeople = updatePersonRoll(prevPeople, activePerson, roll);
    localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));

    const nextPerson = getNextPerson(updatedPeople);
    return nextPerson
      ? setNextActivePerson(updatedPeople, nextPerson)
      : handleEndOfRound(updatedPeople, setPeople, setAppState);
  });
}

function updatePersonRoll(
  people: TPerson[],
  activePerson: TPerson,
  roll: number,
) {
  return people.map((person) =>
    person.id === activePerson.id
      ? { ...person, state: PersonState.IDLE, roll }
      : person,
  );
}

function setNextActivePerson(people: TPerson[], nextPerson: TPerson) {
  const updatedPeople = people.map((person) =>
    person.id === nextPerson.id
      ? { ...person, state: PersonState.ACTIVE }
      : person,
  );
  localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));
  return updatedPeople;
}

function handleEndOfRound(
  people: TPerson[],
  setPeople: SetPeopleAction,
  setAppState: SetAppStateAction,
) {
  const activePeople = people.filter(
    (person) => ![PersonState.DONE, PersonState.LOST].includes(person.state),
  );
  const rolls = activePeople
    .map((person) => person.roll)
    .filter((roll) => roll !== null) as number[];
  const minRoll = Math.min(...rolls);
  const lowestRollPeople = activePeople.filter(
    (person) => person.roll === minRoll,
  );

  return lowestRollPeople.length === 1
    ? setPersonAsLost(
        people,
        activePeople,
        lowestRollPeople[0],
        setPeople,
        setAppState,
      )
    : resetLowestRollPeople(people, activePeople, lowestRollPeople);
}

function setPersonAsLost(
  people: TPerson[],
  activePeople: TPerson[],
  lowestRollPerson: TPerson,
  setPeople: SetPeopleAction,
  setAppState: SetAppStateAction,
) {
  const updatedPeople = people.map((person) => {
    if (!activePeople.some((p) => p.id === person.id)) return person;
    return person.id === lowestRollPerson.id
      ? { ...person, state: PersonState.LOST }
      : { ...person, state: PersonState.DONE };
  });

  setPeople(updatedPeople);
  localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));

  if (updatedPeople.some((person) => person.state === PersonState.LOST)) {
    setAppState(AppState.COMPLETED);
    localStorage.setItem(LocalStorageKey.APP_STATE, AppState.COMPLETED);
  }

  return updatedPeople;
}

function resetLowestRollPeople(
  people: TPerson[],
  activePeople: TPerson[],
  lowestRollPeople: TPerson[],
) {
  const updatedPeople = people.map((person) => {
    if (!activePeople.some((p) => p.id === person.id)) return person;
    return lowestRollPeople.some((p) => p.id === person.id)
      ? { ...person, roll: null, state: PersonState.IDLE }
      : { ...person, state: PersonState.DONE };
  });

  const firstLowestRollPerson = updatedPeople.find(
    (person) => person.roll === null,
  );
  if (firstLowestRollPerson) {
    firstLowestRollPerson.state = PersonState.ACTIVE;
  }

  localStorage.setItem(LocalStorageKey.PEOPLE, JSON.stringify(updatedPeople));
  return updatedPeople;
}
