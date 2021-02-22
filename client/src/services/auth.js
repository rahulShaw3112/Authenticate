import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = async (values, callback) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/api/user/register",
      values
    );
    callback(result)
  } catch(e) {
    console.error(e);
  }
};

export const login = async (values, callback) => {
  try {
    const result = await axios.post(
      "http://localhost:4000/api/user/login",
      values
    );
    callback(result)
  } catch(e) {
    console.error(e)
  }
};