import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, sleep } from "k6";

export const options = {
  vus: 3,
  duration: '30s',
}

export default function () {
  const searchParams = new URLSearchParams([
    ['n', '20'],
  ]);

  // https://wa-alina.azurewebsites.net/api/main/factorial?n=20
  const res = http.get(`${'https://wa-alina.azurewebsites.net/api/main/factorial'}?${searchParams.toString()}`);

  check(res, {
    'status is 200': () => res.status === 200,
  });

  sleep(1);
}

// http_reqs......................: 84      2.747491/s