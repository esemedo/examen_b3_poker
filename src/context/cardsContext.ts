import { createContext } from "react";

export const cardsContext = createContext({} as CardContext)
export const CardsProvider = cardsContext.Provider