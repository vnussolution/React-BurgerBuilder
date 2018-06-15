import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-9c0ef.firebaseio.com"
});

export default instance;
