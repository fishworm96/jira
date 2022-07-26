import { useEffect } from "react";
import { cleanObject } from "utils/index";
import { useAsync } from "utils/use-async";
import { useHttp } from "./http";
import { User } from "types/User";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param, run, client]);
  return result;
};
