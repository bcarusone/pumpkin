import axios from 'axios';

import { BASE_API } from "../constants";
import { setUtilization } from "../state";

export default function loadUtilization(claimId) {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/claims/7f94cd56-1247-4f62-9540-4806668018ee/utilization`)
            .then((data) => dispatch(setUtilization(data?.data?.body?.data[0])));
            // .catch(() => {
            //     dispatch(setAppClaims(some error?));
            // });
        // dispatch(setAppClaims(HARD_CODED_DATA));
    }
}