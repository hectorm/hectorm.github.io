let ratesPromise = null;
let ratesCacheKey = -1;

const internalFetchRates = async () => {
  const endpoint = new URL("https://cdn.moneyconvert.net/api/latest.json");
  // Prevent cached response.
  endpoint.searchParams.set("_", Date.now());

  const response = await fetch(endpoint, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Unexpected API response code: ${response.status}`);
  }

  const data = await response.json();
  if (typeof data.rates !== "object") {
    throw new Error("Unexpected API response body");
  }

  return new Map([...Object.entries(data.rates)]);
};

// We use a wrapper method to return the cached promise to avoid race conditions.
export const fetchRates = (...args) => {
  // The following cache key is refreshed every hour.
  const currentRatesCacheKey = (Date.now() / 1000 / 60 / 60) | 0;
  if (ratesPromise === null || ratesCacheKey !== currentRatesCacheKey) {
    ratesPromise = internalFetchRates(...args);
    ratesCacheKey = currentRatesCacheKey;
  }

  return ratesPromise;
};
