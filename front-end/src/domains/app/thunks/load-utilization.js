import axios from 'axios';

import { BASE_API } from "../constants";
import { setUtilization } from "../state";

export default function loadUtilization(claimId) {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/claims/${claimId}/utilization`)
            .then((data) => dispatch(setUtilization(data?.data?.body?.data[0])));
            // .catch(() => {
            //     dispatch(setAppClaims(some error?));
            // });
        // dispatch(setAppClaims(HARD_CODED_DATA));
    }
}