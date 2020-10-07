import React from 'react';
import DataService from '../services/data-service';

const Vehicle = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.year}</td>
        <td>{props.description}</td>
    </tr>
);   

const Vehicles = (props) => (
    <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Year</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
        {props.vehicles.map(vehicle => <Vehicle {...vehicle}/>)}
        </tbody>    

    </table>
);   

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          vehicles: []
        };
        this.service = DataService.getInstance();
    }

    componentDidMount(){
        this.service.vehicles()
            .then(res => res.json())
            .then(
                (result) => 
                this.setState({
                    isLoaded:true,
                    vehicles: result
                }),
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <h1>Vehicles</h1>
                <Vehicles vehicles={this.state.vehicles}></Vehicles>
            </header>
            </div>
        );
    }
}

export default Log;
