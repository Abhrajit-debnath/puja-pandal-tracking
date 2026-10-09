import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 10,
    iterations: 20,
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration: ['p(95)<2000'],
    }
};

const BASE_URL = 'http://localhost:8000/api/v1/pandals';



export default function () {
    const pandalId = 'cmu2yaipk0000mljxhsqlfubq';
    const payload = JSON.stringify({ crowdLevel: "CALM" });
    const res = http.post(`${BASE_URL}/${pandalId}/checkins`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    console.log(`Checkin Status: ${res.status}`); check(res, { 'checkins 201': (r) => r.status === 201 });
};



// import { check } from 'k6';
// import http from 'k6/http';

// export const options = {
//     vus: 100, 
//     duration: '30s',
//     thresholds: {
//         http_req_failed: ['rate<0.01'], 
//         http_req_duration: ['p(95)<1000'], 
//     }
// };

// const BASE_URL = 'http://localhost:8000/api/v1/pandals';
// const CHANDANNAGAR_COORDS = { lat: 12.345, lng: 56.784 };

// export default function () {
//     const res = http.get(`${BASE_URL}/nearby/location?latitude=${CHANDANNAGAR_COORDS.lat}&longitude=${CHANDANNAGAR_COORDS.lng}`);
//     check(res, { 'nearby 200': (r) => r.status === 200 });
// }
