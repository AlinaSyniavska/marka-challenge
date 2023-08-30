import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '2m',
}

export default () => {
  // const res = http.get('https://wa-alina.azurewebsites.net/api/main/apiCalls');
  const res = http.get('http://localhost:5000/api/main/apiCalls');
  sleep(1)
}

// http_reqs......................: 68     2.208126/s


