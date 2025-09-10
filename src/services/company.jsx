import axios from "axios";
const localUrl = "/company";

const getAll = () => {
  const request = axios.get(localUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(localUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${localUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletecompany = (id) => {
  const request = axios.delete(`${localUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deletecompany };

