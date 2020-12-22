import React from 'react';
import axios from 'axios';
import API from "../../utils/API";

function callServer() {
  axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/test`, {
    params: {
      table: 'users',
    },
  }).then((response) => {
    console.log(response.data);
  });
}

function saveKeys(public_key, private_key, id_user) {
  async () => {
    const { data } = API.saveKeys(public_key, private_key, id_user);
  }
}

function addEconomy(public_key, service, price) {
  axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/addEconomy`, {
    params: {
      public_key: public_key,
      service: service,
      price:price,
    },
  }).then((response) => {
    console.log("addEconomy");
    console.log(response.data);
  });
}
export function SampleComponent() {
  return (
    <div>
      This is a sample component
      {callServer()}
      {saveKeys("abcdef", "deef", 1)}
    </div>
  );
}