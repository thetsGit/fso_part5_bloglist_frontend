import axios from "axios";
// import logger from "../utils/logger";

const baseUrl = "/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default login;
