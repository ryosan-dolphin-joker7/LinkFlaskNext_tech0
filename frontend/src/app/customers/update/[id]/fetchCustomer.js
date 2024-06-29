export default async function fetchCustomer(id) {
  const res = await fetch(process.env.API_ENDPOINT + "/allcustomers", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}
