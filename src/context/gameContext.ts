import { createContext } from "react";

export const gameContext = createContext({} as GameContext)
export const GameProvider = gameContext.Provider