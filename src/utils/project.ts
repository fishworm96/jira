import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);

  return result;
};
