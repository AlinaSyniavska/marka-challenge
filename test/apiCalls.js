import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '30s',
}

export default () => {
  const res = http.get('https://wa-alina.azurewebsites.net/api/main/apiCalls');
  sleep(1)
}

// http_reqs......................: 68     2.208126/s


