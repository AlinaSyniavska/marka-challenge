import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 3,
  duration: "2m"
};

export default () => {
  /*for (let id = 1; id <= 100; id++) {
    http.get(`https://wa-alina.azurewebsites.net/api/main/products/${id}`);
  }*/

  const id = 10;
  http.get(`https://wa-alina.azurewebsites.net/api/main/products/${id}`);

  sleep(1);
}

// http_reqs......................: 84    2.726622/s


