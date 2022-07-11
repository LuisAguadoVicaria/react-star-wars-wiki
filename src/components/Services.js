export const load = async (url, page = false) => {
  let local = JSON.parse(window.localStorage.getItem(url + page));
  let query = `https://www.swapi.tech/api${url}?page=${page}&limit=10`;
  if (!page) query = `https://www.swapi.tech/api${url}`;
  if (local === null) {
    await fetch(query)
      .then((res) => res.json())
      .then((data) => (local = data));
    console.log("Fetch: ", query);
    window.localStorage.setItem(
      url + page,
      JSON.stringify({ ...local, ...{ time: new Date() } })
    );
  }
  //console.log(local)
  return JSON.stringify(local);
};

export const loadSearch = async (query, page) =>
  await fetch(`https://www.swapi.tech/api/${page}/?name=${query}`)
    .then((res) => res.json())
    .then((data) => data);

export const getFavs = () => {
  return JSON.parse(window.localStorage.getItem("favs-sw") || "[]");
};

export const setFavs = (name, path) => {
  window.localStorage.setItem(
    "favs-sw",
    JSON.stringify([...getFavs(), ...[{ name: name, path: path }]])
  );
};

export const delFavs = (name) => {
  let favs = JSON.parse(window.localStorage.getItem("favs-sw") || "[]");
  favs = favs.filter((e) => e.name !== name);
  window.localStorage.setItem("favs-sw", JSON.stringify(favs));
};
