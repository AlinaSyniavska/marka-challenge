import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { sleep } from "k6";

export const options = {
  vus: 3,
  duration: '2m',
}

export default function () {
  const searchParams = new URLSearchParams([
    ['filename', 'azureText.txt'],
  ]);

  // https://wa-alina.azurewebsites.net/api/main/readTextFile?filename=azureText.txt
  // const res = http.get(`${'https://wa-alina.azurewebsites.net/api/main/readTextFile'}?${searchParams.toString()}`);
  const res = http.get(`${'http://localhost:5000/api/main/readTextFile'}?${searchParams.toString()}`);

  sleep(1);
}

// http_reqs......................: 84     2.712346/s


