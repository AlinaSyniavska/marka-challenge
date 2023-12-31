import { sleep } from "k6";
import http  from 'k6/http';

export const options = {
  vus: 3,
  duration: '2m',
}

export default () => {
  const postData = JSON.stringify({
    sentence: 'Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications.',
  });

  // const res = http.post('https://wa-alina.azurewebsites.net/api/main/reverseWords', postData);
  const res = http.post('http://localhost:5000/api/main/reverseWords', postData);

  sleep(1)
}

// http_reqs..................: 84      2.723459/s




