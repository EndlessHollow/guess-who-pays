import { AppState } from "@/types";

export function isAppState(value: string): value is AppState {
  return Object.values(AppState).some((state) => state === value);
}
