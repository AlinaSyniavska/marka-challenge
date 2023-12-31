import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '2m', // This can be shorter or just a few iterations
}

export default () => {
  // const res = http.get('https://wa-alina.azurewebsites.net/api/main/challenge');
  const res = http.get('http://localhost:5000/api/main/challenge');
  sleep(1)
}

// http_reqs......................: 84    2.764696/s

// "test:demo": "npm run build && k6 run dist/tests/reqres.cjs -a localhost:6566"
