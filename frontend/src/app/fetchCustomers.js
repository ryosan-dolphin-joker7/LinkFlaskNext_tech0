export default async function fetchCustomers() {
  //const res = await fetch(process.env.API_ENDPOINT + "/allcustomers", {
  //  cache: "no-cache",
  //});

  const res = await fetch("http://localhost:5000/allcustomers", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }
  return res.json();
}
