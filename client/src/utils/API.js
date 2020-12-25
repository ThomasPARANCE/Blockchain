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

    addTransaction: function(amount, fee, key_from, key_to, private_key, id_user) {
        return axios.post(`${burl}/user/addTransaction`, {amount, fee, key_from, key_to, private_key, id_user}, { headers: headers });
    },

    publicTransactionNetwkork: function(amount, fee, key_from, key_to, private_key, signature) {
        return axios.post(`${burl}/user/publicTransactionNetwkork`, {amount, fee, key_from, key_to, private_key, signature}, { headers: headers });
    },

    joinNetwork: function(id_user) {
        return axios.post(`${burl}/user/joinNetwork`, {id_user}, { headers: headers });
    },

    getTabNetwork: function() {
        return axios.post(`${burl}/user/getTabNetwork`, { headers: headers });
    },

    getBlockToInsertion: function(id_user) {
        return axios.post(`${burl}/user/getBlockToInsertion`, {id_user}, { headers: headers });
    },

    getUserBlockchain: function(id_user) {
        return axios.post(`${burl}/user/getUserBlockchain`, {id_user}, { headers: headers });
    },

    checkHash: function(id_block, prev_hash, block_nbr, hash) {
        return axios.post(`${burl}/user/checkHash`, {id_block, prev_hash, block_nbr, hash}, { headers: headers });
    },

    sendToBlockChain: function(id_block, id_user) {
        return axios.post(`${burl}/user/sendToBlockChain`, {id_block, id_user}, { headers: headers });
    },

    getAllTransactionNetwork: function(id_user) {
        return axios.post(`${burl}/user/getAllTransactionNetwork`, {id_user}, { headers: headers });
    },

    checkSignature: function(id) {
        return axios.post(`${burl}/user/checkSignature`, {id}, { headers: headers });
    },

    sendMempool: function(id) {
        return axios.post(`${burl}/user/sendMempool`, {id}, { headers: headers });
    },

    getAllTransactionMempool: function(id_user) {
        return axios.post(`${burl}/user/getAllTransactionMempool`, {id_user}, { headers: headers });
    },

    insertTransactionBlockMine: function(id_user, id_transaction) {
        return axios.post(`${burl}/user/insertTransactionBlockMine`, {id_user, id_transaction}, { headers: headers });
    },

    getBlockMiner: function(id_user) {
        return axios.post(`${burl}/user/getBlockMiner`, {id_user}, { headers: headers });
    },

    resetBlock: function(id_user, id_block) {
        return axios.post(`${burl}/user/resetBlock`, {id_user, id_block}, { headers: headers });
    },

    insertPreviousHash: function(id_user, block_nbr, id_block) {
        return axios.post(`${burl}/user/insertPreviousHash`, {id_user, block_nbr, id_block}, { headers: headers });
    },

    Mine: function(id_user, id_block, nbr_block, prev_hash) {
        return axios.post(`${burl}/user/Mine`, {id_user, id_block, nbr_block, prev_hash}, { headers: headers });
    },

    sendBlock: function(id_user, id_block) {
        return axios.post(`${burl}/user/sendBlock`, {id_user, id_block}, { headers: headers });
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
