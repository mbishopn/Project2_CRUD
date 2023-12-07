/*
    In this file, I import axios and create my object called client
    I created also a separated file for crud functions, they all use this client
    to perform CRUD actions, then whenever I want my App to interact with API, I'll 
    call those functions

*/

import axios from "axios"
/*
    this axios object has the base url, the one retrieving the products. for create, update and delete,
    a complementary string will be added by passing it as parameter in the call to reach the correct 
    route in the backend server
*/
export const client = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

