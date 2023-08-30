import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 3,
  duration: "5m"
};

export default () => {
  const id = 10;
  // http.get(`https://wa-alina.azurewebsites.net/api/main/products/${id}`);
  http.get(`http://localhost:5000/api/main/products/${id}`);

  sleep(1);
}

// http_reqs......................: 84    2.726622/s


