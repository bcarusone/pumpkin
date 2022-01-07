import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppClaims } from "../state";

const HARD_CODED_DATA = {
    type: 'prevent',
    id: 12620,
    amount_claimed: 800,
    line_items: [
        {
            type: 'Vaccine',
            quantity: 3,
            decision: true,
            amount_claimed: 200,
        },
        {
            type: 'Wellness Exams',
            quantity: 1,
            decision: true,
            amount_claimed: 200,
        },
        {
            type: 'Blood Test',
            quantity: 2,
            decision: true,
            amount_claimed: 200,
        },
        {
            type: 'Fecal "Poop" Test',
            quantity: 1,
            decision: false,
            amount_claimed: 200,
        }
    ]
};

export default function loadData() {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/claims`)
            .then((data) => dispatch(setAppClaims(data?.data?.body?.data[0])));
            // .catch(() => {
            //     dispatch(setAppClaims(some error?));
            // });
        // dispatch(setAppClaims(HARD_CODED_DATA));
    }
}