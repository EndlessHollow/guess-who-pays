import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { AppState, TPerson } from "@/types";
import { isAppState } from "@/utils/is-app-state";

type TCtx = {
  people: TPerson[];
  appState: AppState;
  setPeople: Dispatch<SetStateAction<TPerson[]>>;
  setAppState: Dispatch<SetStateAction<AppState>>;
};

type Props = {
  children: ReactNode;
};

const AppStateCtx = createContext<TCtx | undefined>(undefined);

export function AppStateProvider(props: Props) {
  const { children } = props;

  const storedAppState = localStorage.getItem("app-state");

  console.log({ storedAppState });
  console.log("con", isAppState(storedAppState));

  const initialAppState =
    storedAppState && isAppState(storedAppState)
      ? storedAppState
      : AppState.SETUP;

  console.log({ initialAppState });

  const [people, setPeople] = useState<TPerson[]>([]);
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
