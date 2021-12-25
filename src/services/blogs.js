import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = async (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const postOne = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blogObj, config);
  return res.data;
};

const putOne = async (blogId, blogObj) => {
  const res = await axios.put(`${baseUrl}/${blogId}`, blogObj);
  return res.data;
};

const deleteOne = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${blogId}`, config);
  return res.data;
};

export default { getAll, postOne, setToken, putOne, deleteOne };
