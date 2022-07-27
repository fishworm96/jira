import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useKanbans } from "utils/kanban";
import { useProject } from "utils/project";
import { useLocation } from "react-router";
import { useTasks } from "utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];

  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansInProject = () =>
  useKanbans({ projectId: useProjectIdInUrl() });

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksInProject = () =>
  useTasks({ projectId: useProjectIdInUrl() });
