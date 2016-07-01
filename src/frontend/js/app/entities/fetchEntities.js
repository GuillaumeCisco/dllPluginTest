import queryString from 'query-string';
import _ from 'lodash';
if (typeof FormData === 'undefined') {
    var FormData = require('form-data');
}

/* globals API_URL */

const fetchList = (url, jwt) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    if (jwt) {
        headers['Authorization'] = 'Bearer ' + jwt;
    }

    return fetch(url, {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        //credentials: 'include',
        mode: 'cors',
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(result => Promise.reject(new Error(result)));
            }

            return response.json();
        })
        .then(json => {
            return {list: json};
        }, error => ({
            error,
        }));
};

export const fetchEntitiesFactory = path => (get_parameters, jwt) => {
    const url = API_URL + '/' + path + '/' + (!_.isEmpty(get_parameters) ? '?' + queryString.stringify(get_parameters) : '');
    return fetchList(url, jwt);
};
