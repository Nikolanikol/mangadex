import { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

// Создаём контекст с типом RootStore или null (на начальном этапе)
const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = (): RootStore => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useStores должен использоваться внутри RootStoreProvider");
  }
  return store;
};

export default RootStoreContext;
