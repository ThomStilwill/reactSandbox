import { Component } from "react";

export class DataService extends Component{
    static myInstance = null;

    constructor(){
        super();
        this.baseUrl = 'http://localhost:4200';
    }

    static getInstance() {
        return new DataService();
    }
    
    vehicles() {

        const url = `${this.baseUrl}/api/vehicles`;
        console.log(url);

        return fetch(url,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            })
    }
}

export default DataService;

