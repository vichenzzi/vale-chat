import { createContext } from "react";

export interface userData {
  username: string;
  profile_src: string;
}

export const UserContext = createContext<undefined | userData>(undefined);
