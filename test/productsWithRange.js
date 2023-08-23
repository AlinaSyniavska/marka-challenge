import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '2m',
}

export default () => {
  // https://wa-alina.azurewebsites.net/api/main/products?rangeStart=10&rangeEnd=100
  const url = new URL('https://wa-alina.azurewebsites.net/api/main/products');

  url.searchParams.append('rangeStart', '10');
  url.searchParams.append('rangeEnd', '100');

  const res = http.get(url.toString());

  sleep(1)
}

// http_reqs......................: 81     2.658091/s



