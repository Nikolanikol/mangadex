import React, { FC, ReactNode } from "react";
import RootStoreContext from "./RootStoreContext";
import { RootStore } from "./RootStore";
interface MyComponentProps {
  children: ReactNode;
}
export const RootStoreProvider: FC<MyComponentProps> = ({ children }) => {
  // Создаём инстанс RootStore
  const rootStore = new RootStore();

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};
