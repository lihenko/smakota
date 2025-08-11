export async function getCities() {
  const apiKey = process.env.NOVA_POSHTA_API_KEY;
  const url = "https://api.novaposhta.ua/v2.0/json/";

  const body = {
    apiKey,
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {}
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  return Array.isArray(data.data)
    ? data.data.map((city: any) => ({
        Ref: city.Ref,
        Description: city.Description
      }))
    : [];
}
