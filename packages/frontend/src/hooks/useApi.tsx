import createClient from "openapi-fetch";
import { createContext, ParentComponent, useContext } from "solid-js";
import { paths } from "../../generated/api/mailtura.js";
import { API_URL } from "../constants.js";

interface ApiContextType {
  client: typeof client;
}

const client = createClient<paths>({
  baseUrl: API_URL,
  credentials: "include",
  redirect: "follow",
});

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: ParentComponent = props => {
  return <ApiContext.Provider value={{ client }}>{props.children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return client;
};
