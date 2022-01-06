import axios from 'axios';

import { BASE_API } from "../constants";

export default function updateData(claimId, newData) {
    return (dispatch) => {
        return axios
            .post(`${BASE_API}/claims/7f94cd56-1247-4f62-9540-4806668018ee`, newData)
            .then(function (response) {
                console.log(response);
              })
            .catch(function (error) {
                console.log(error);
              });
    }
}