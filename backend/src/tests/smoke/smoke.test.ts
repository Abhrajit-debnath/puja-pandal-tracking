import { check, group, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    iterations: 10,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
    }
};

const BASE_URL = 'http://localhost:8000/api/v1';

export default function () {
    
  group('01 - Nearby', function () {
    const res = http.get(`${BASE_URL}/nearby/location?latitude=12.345&longitude=56.784`);
    check(res, { 'nearby 200': (r) => r.status === 200 });
});

    sleep(1); 


    group('02 - Details', function () {
        const res = http.get(`${BASE_URL}/cmu2yaipk0000mljxhsqlfubq`);
        check(res, { 'details 200': (r) => r.status === 200 });
    });


}