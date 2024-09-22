export enum AppState {
  SETUP = "setup",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}
export enum PersonState {
  IDLE = "idle",
  SAFE = "safe",
  LOST = "lost",
  TIEBREAK = "tiebreak",
}

export type TPerson = {
  id: string;
  name: string;
  score: number | null;
  state: PersonState;
};
