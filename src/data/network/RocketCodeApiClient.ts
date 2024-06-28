import axios from "axios";
import RocketCodeConfig from "../../domain/RocketCodeConfig";

const api = axios.create({
    baseURL: RocketCodeConfig.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

export {api}