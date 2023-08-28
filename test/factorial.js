import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, sleep } from "k6";

export const options = {
  vus: 3,
  duration: '5m',
}

export default function () {
  const searchParams = new URLSearchParams([
    ['n', '20'],
  ]);

  // https://wa-alina.azurewebsites.net/api/main/factorial?n=20
  const res = http.get(`${'https://wa-alina.azurewebsites.net/api/main/factorial'}?${searchParams.toString()}`);
  // const res = http.get(`${'http://localhost:5000/api/main/factorial'}?${searchParams.toString()}`);

  check(res, {
    'status is 200': () => res.status === 200,
  });

  sleep(1);
}

// iterations.....................: 84      2.755833/s

