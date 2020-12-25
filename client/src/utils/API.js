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

    getKeys: function(id_user) {
        return axios.post(`${burl}/user/getKeys`, {id_user}, { headers: headers });
    },

    addTransaction: function(amount, fee, key_from, key_to, private_key) {
        return axios.post(`${burl}/user/addTransaction`, {amount, fee, key_from, key_to, private_key}, { headers: headers });
    },

    publicTransactionNetwkork: function(idTransaction) {
        return axios.post(`${burl}/user/publicTransactionNetwkork`, {idTransaction}, { headers: headers });
    },

    joinNetwork: function(id_user) {
        return axios.post(`${burl}/user/joinNetwork`, {id_user}, { headers: headers });
    },

    getTabNetwork: function() {
        return axios.post(`${burl}/user/getTabNetwork`, { headers: headers });
    },

    getAllTransactionNetwork: function() {
        return axios.post(`${burl}/user/getAllTransactionNetwork`, { headers: headers });
    },

    sendMempool: function(id) {
        return axios.post(`${burl}/user/sendMempool`, {id}, { headers: headers });
    },

    getAllTransactionMempool: function() {
        return axios.post(`${burl}/user/getAllTransactionMempool`, { headers: headers });
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
    },

    checkBalance: function(id) {
        return axios.post(`${burl}/user/checkBalance`, {id}, { headers: headers});
    }
};
