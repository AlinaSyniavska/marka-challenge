import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { sleep } from "k6";

export const options = {
  vus: 3,
  duration: '5m',
}

export default function () {
  const searchParams = new URLSearchParams([
    ['n', '11'],
  ]);

  // https://wa-alina.azurewebsites.net/api/main/fibonacciSequence?n=11
  // const res = http.get(`${'https://wa-alina.azurewebsites.net/api/main/fibonacciSequence'}?${searchParams.toString()}`);
  const res = http.get(`${'http://localhost:5000/api/main/fibonacciSequence'}?${searchParams.toString()}`);


  sleep(1);
}

// http_reqs......................: 84    2.763412/s

