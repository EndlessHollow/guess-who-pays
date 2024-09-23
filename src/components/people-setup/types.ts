import { Dispatch, SetStateAction } from "react";

export type TInputState = {
  value: string;
  hasError: boolean;
};

export type setInputStateAction = Dispatch<SetStateAction<TInputState>>;
export type setHasErrAction = Dispatch<SetStateAction<boolean>>;
