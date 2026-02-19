const makeApiUrl = () => {
  const location = window.location;
  const protocol = location.protocol;
  const host = location.hostname;
  const port = location.port;
  if ((protocol === "http" && port === "80") || (protocol === "https" && port === "443")) {
    return `${protocol}://${host}/`;
  }
  return `${protocol}//${host}:${port}/`;
};

const configuredApiUrl = import.meta.env.MODE === "production" ? makeApiUrl() : "http://localhost:3333/";

export const API_URL = configuredApiUrl.endsWith("/") ? configuredApiUrl : `${configuredApiUrl}/`;
