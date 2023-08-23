import { check, sleep } from "k6";
import http  from 'k6/http';

export const options = {
  vus: 3,
  duration: '2m',
}

export default () => {
  const postData = JSON.stringify({
    integers:  [
      6723, 546, 29, 1536, 8759, 6834, 213, 9745, 35, 489,
      1742, 7385, 24, 5436, 2951, 9871, 245, 152, 4736, 849,
      6214, 3829, 4156, 79, 4625, 5321, 789, 1209, 3462, 95,
      2563, 4107, 1325, 4910, 6839, 2376, 8012, 3467, 9325, 5896,
      2140, 8745, 3962, 4729, 1523, 6420, 3579, 2461, 9045, 1592,
      2845, 6391, 2087, 4012, 7932, 4670, 1520, 3091, 7253, 1856,
      4987, 1364, 5972, 8193, 4531, 2095, 3624, 7320, 9468, 5740,
      2593, 7135, 2064, 4892, 5739, 9274, 4825, 6480, 2931, 7108,
      3614, 7532, 4091, 6419, 8672, 1946, 3280, 5391, 2876, 9450,
      6891, 5720, 3182, 4098, 5649, 7341, 2385, 7952, 4013, 9250,
      1026, 8457, 3640, 2845, 1253, 8042, 9107, 6845, 3950, 1893,
      5286, 7140, 2509, 4681, 1543, 9235, 7604, 2158, 4871, 2094,
      1590, 3271, 6389, 5140, 2975, 6281, 4973, 1452, 3952, 1345,
      1803, 5029, 3264, 4162, 9245, 3186, 7053, 1978, 8540, 4095,
      2318, 5732, 6950, 1574, 8032, 2365, 9150, 5087, 3465, 7284,
      6428, 3891, 2356, 5780, 2685, 4972, 6184, 4058, 3967, 2354,
      6049, 3120, 7803, 5367, 2946, 6825, 1597, 2146, 7312, 8950,
      2861, 9723, 6394, 2485, 5904, 4276, 4815, 2594, 8165, 3729,
      1546, 9458, 3079, 5268, 4795, 6209, 2043, 7589, 3957, 1783,
      5301, 6972, 4195, 8327, 2658, 4703, 1948, 5092, 3164, 8715,
      3826, 4952, 3405, 2785, 5891, 4236, 7650, 2910, 1983, 6523,
      4739, 2047, 8160, 3192, 5673, 4390, 1743, 6028, 2569, 9173,
      5360, 2487, 4902, 8103, 3748, 6490, 3876, 2340, 7206, 8435,
      1547, 8190, 3168, 5792, 4620, 7380, 2957, 6923, 2108, 4073,
      5074, 6302, 1786, 4530, 6910, 2583, 7920, 3189, 5047, 2390,
      8450, 6108, 2974, 7283, 3915, 1760, 4823, 5137, 6478, 4050,
      2456, 8692, 2096, 5724, 3948, 7350, 1836, 5097, 3648, 9263,
      5086, 7190, 2498, 6804, 3742, 6504, 3873, 2342, 7215, 8437,
      1632, 8174, 3276, 5798, 4636, 7389, 2964, 6927, 2147, 4078,
      5191, 6319, 1787, 4539, 6923, 2580, 7936, 3194, 5045, 2393
    ]
  });

  const res = http.post('https://wa-alina.azurewebsites.net/api/main/sortArray', postData);

  check(res, {
    'status is 200': () => res.status === 200,
  });
  sleep(1)
}

// http_reqs..................: 84      2.736057/s




