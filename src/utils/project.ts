import { useEffect } from "react";
import { cleanObject } from "utils/index";
import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
