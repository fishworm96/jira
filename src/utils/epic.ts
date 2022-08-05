import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "./http";
import { Epic } from "./../types/epic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", {
      data: param,
    })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
