import { QueryKey, useMutation, useQueryClient } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import {
  DeleteMutator,
  PathsWithDelete,
  PropertyRequestParameters,
  RequestBody,
  RequestParameters,
  ResponseError,
} from "./types.js";
import { maybeHandleError } from "./errors.js";

const extractParameters = <Path extends PathsWithDelete>(
  parameters: RequestParameters<Path>
): PropertyRequestParameters<Path> => {
  return Object.keys(parameters).reduce((obj, key) => {
    return {
      ...obj,
      [key]: (parameters as any)[key](),
    };
  }, {}) as PropertyRequestParameters<Path>;
};

const deleteOperation = async <Path extends PathsWithDelete>(
  client: ReturnType<typeof useApi>,
  url: Path,
  parameters: RequestParameters<Path>,
  body: RequestBody<Path>
) => {
  const response = await client.DELETE(url as any, {
    params: {
      path: extractParameters(parameters),
    },
    body: body,
  });

  if (maybeHandleError(response)) {
    return response.data;
  }
};

export function useDeleteMutation<Path extends PathsWithDelete, InvalidationQueryKeys extends QueryKey[]>(
  url: Path,
  parameters: RequestParameters<Path>,
  ...queryKeys: InvalidationQueryKeys
): DeleteMutator<Path> {
  const queryClient = useQueryClient();
  const client = useApi();

  const mutator = useMutation<RequestParameters<Path>, ResponseError, never>(() => ({
    mutationFn: body => deleteOperation(client, url, parameters, body),
    onSuccess: () => {
      if (queryKeys) {
        for (const queryKey of queryKeys) {
          queryClient.invalidateQueries({ queryKey: queryKey });
        }
      }
    },
    onError: error => {
      console.error(error);
    },
  }));

  return {
    ...mutator,
    mutate: (opts?) => {
      return mutator.mutate(undefined as never, opts);
    },
  };
}
