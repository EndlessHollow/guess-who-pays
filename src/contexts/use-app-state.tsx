import { createContext, ReactNode, useContext, useState } from "react";
import { AppState, LocalStorageKey, TPerson } from "@/types";
import { isAppState } from "@/utils/is-app-state";
import { SetPeopleAction, SetAppStateAction } from "../types";

type TCtx = {
  people: TPerson[];
  appState: AppState;
  setPeople: SetPeopleAction;
  setAppState: SetAppStateAction;
};

type Props = {
  children: ReactNode;
};

const AppStateCtx = createContext<TCtx | undefined>(undefined);

export function AppStateProvider(props: Props) {
  const { children } = props;

  const storePeople = localStorage.getItem(LocalStorageKey.PEOPLE);
  const storedAppState = localStorage.getItem(LocalStorageKey.APP_STATE);

  const initialPeople = storePeople ? JSON.parse(storePeople) : [];

  const initialAppState =
    storedAppState && isAppState(storedAppState)
      ? storedAppState
      : AppState.SETUP;

  const [people, setPeople] = useState<TPerson[]>(initialPeople);
  const [appState, setAppState] = useState<AppState>(initialAppState);

  const value = {
    people,
    appState,
    setPeople,
    setAppState,
  };

  return <AppStateCtx.Provider value={value}>{children}</AppStateCtx.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateCtx);

  if (!ctx) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }

  return ctx;
}
