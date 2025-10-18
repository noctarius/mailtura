import { FetchResponse, ParseAsResponse } from "openapi-fetch";
import { MediaType, ResponseObjectMap, SuccessResponse } from "openapi-typescript-helpers";
import { ResponseError } from "./types.js";

export function maybeHandleError<T extends Record<string | number, any>, Options, Media extends MediaType>(
  response: FetchResponse<T, Options, Media>,
  validateStatus?: (status: number) => boolean
): response is {
  data: ParseAsResponse<SuccessResponse<ResponseObjectMap<T>, Media>, Options>;
  error?: never;
  response: Response;
} {
  if (validateStatus && validateStatus(response.response.status)) {
    return true;
  }

  if (response.error) {
    const status = response.response.status;
    const data = response.data;
    throw new ResponseError(data ? data : response.error, status);
  }

  if (response.response.status <= 200 && response.response.status >= 299) {
    const status = response.response.status;
    throw new ResponseError(response.data, status);
  }
  return true;
}
