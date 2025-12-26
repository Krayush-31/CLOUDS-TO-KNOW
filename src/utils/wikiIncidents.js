export async function fetchCityIncidents(city) {
  const keywords = ["flood", "heatwave", "cyclone", "storm", "disaster"];
  const results = [];

  for (const key of keywords) {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(
      `${city} ${key}`
    )}&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (data?.query?.search?.length) {
      results.push(...data.query.search.slice(0, 1));
    }
  }

  return results;
}
