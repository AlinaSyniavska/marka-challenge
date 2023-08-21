import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: "30s" // This can be shorter or just a few iterations
};

export default () => {
  /*for (let id = 1; id <= 100; id++) {
    http.get(`https://wa-alina.azurewebsites.net/api/main/products/${id}`);
  }*/

  const id = 10;
  http.get(`https://wa-alina.azurewebsites.net/api/main/products/${id}`);

  sleep(1);
}

// http_reqs......................: 1200   32.766974/s
