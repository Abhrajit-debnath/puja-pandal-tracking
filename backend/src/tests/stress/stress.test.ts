import { check } from 'k6';
import http from 'k6/http';


export const options = {
    stages: [
        {
            duration: '10s', target: 10
        },
        {
            duration: '20s', target: 100
        },
        {
            duration: '30s', target: 500
        }, {
            duration: '5s', target: 0
        }
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration: ['p(95)<1000'],
    }
}

const CHANDANNAGAR_COORDS = { lat: 12.345, lng: 56.784 };
export default function () {


    const BASE_URL = 'http://localhost:8000/api/v1/pandals';

    const res = http.get(`${BASE_URL}/nearby/location?latitude=${CHANDANNAGAR_COORDS.lat}&longitude=${CHANDANNAGAR_COORDS.lng}`);
    check(res, { 'nearby 200': (r) => r.status === 200 });


}