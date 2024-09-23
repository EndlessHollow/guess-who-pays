import { Dispatch, SetStateAction } from "react";

export enum AppState {
  SETUP = "setup",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}
export enum PersonState {
  IDLE = "idle",
  ACTIVE = "active",
  LOST = "lost",
  DONE = "done",
}

export enum LocalStorageKey {
  PEOPLE = "people",
  APP_STATE = "app_state",
}

export type TPerson = {
  id: string;
  name: string;
  roll: number | null;
  state: PersonState;
};

export type SetPeopleAction = Dispatch<SetStateAction<TPerson[]>>;
export type SetAppStateAction = Dispatch<SetStateAction<AppState>>;
