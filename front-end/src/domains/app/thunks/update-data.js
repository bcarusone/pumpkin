import axios from 'axios';

import { BASE_API } from "../constants";

export default function updateData(claimId, newData) {
    return (dispatch) => {
        return axios
            .post(`${BASE_API}/claims/${claim}`, newData)
            .then(function (response) {
                console.log(response);
              })
            .catch(function (error) {
                console.log(error);
              });
    }
}