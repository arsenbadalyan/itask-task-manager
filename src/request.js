import axios from "axios";

const LIST_URL = "http://localhost:3001/list";

export async function getAllList() {
  const response = await axios.get(LIST_URL).then((res) => res);
  return response.data;
}

export async function setAllList() {
  await axios.post(LIST_URL).then((res) => {
    console.log(res);
    res.push({ id: 45, name: "hhhhhhh" });
  });
}
