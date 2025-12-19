// services/api.js
export const BASEURL = "https://dwdm-psw-heroes-api.onrender.com/api";
export const PUBLICID = "vcDOzUTI";
export const PRIVATEID = "WyzAgozWBxdCizdK";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function getUsers() {
  const res = await fetch(`${BASEURL}/users`, { headers });
  return res.json();
}

export async function getHeroesByPublicId(publicId = PUBLICID) {
  const res = await fetch(`${BASEURL}/users/${publicId}`, { headers });
  return res.json();
}

export async function getTopByPublicId(publicId = PUBLICID) {
  const res = await fetch(`${BASEURL}/users/${publicId}/top`, { headers });
  return res.json();
}

export async function saveHeroes(heroesArray) {
  const res = await fetch(`${BASEURL}/users/${PRIVATEID}`, {
    method: "POST",
    headers,
    body: JSON.stringify(heroesArray),
  });
  return res.json();
}

export async function saveTop(topArray) {
  const res = await fetch(`${BASEURL}/users/${PRIVATEID}/top`, {
    method: "POST",
    headers,
    body: JSON.stringify(topArray),
  });
  return res.json();
}
