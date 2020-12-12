import axios from "axios";

const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8000";

export default {
    login: function(pseudo, password) {
        return axios.post(`${burl}/user/login`,
            {
                pseudo,
                password
            },{ headers: headers }
        );
    },

    saveKeys: function(public_key, private_key, id_user) {
        return axios.post(`${burl}/user/saveKeys`, {public_key, private_key, id_user}, { headers: headers });
    },


    addEconomy: function(public_key, good, price) {
        return axios.post(`${burl}/user/addEconomy`, {public_key, good, price}, { headers: headers });
    },

    getAllEconomy: function() {
        return axios.post(`${burl}/user/getAllEconomy`, { headers: headers });
    },

    isAuth: function() {
        return localStorage.getItem("isConnected") !== null;
    },

    logout: function() {
        localStorage.clear();
    }
};
