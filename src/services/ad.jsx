import axios from "axios";

const baseUrl = "/api/ad";
const localUrl = "/db.json";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    // Fallback a db.json
    const response = await axios.get(localUrl);
    if (response.data && Array.isArray(response.data.ad)) {
      return response.data.ad;
    }
    return [];
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    // Fallback: solo devuelve el objeto
    return newObject;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    // Fallback: solo devuelve el objeto
    return newObject;
  }
};

const deleteAd = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    // Fallback: retorna el id
    return id;
  }
};

export default { getAll, create, update, deleteAd };
