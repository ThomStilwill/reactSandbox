import React from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/data-service';

const Vehicle = (props) => (
    <tr>
        <td>{props.id}/{props.name}</td>
        <td>{props.year}</td>
        <td>{props.description}</td>
        <td><Link to={'' + props.id}>Edit</Link></td>
    </tr>
);   

const VehicleList = (props) => (
    <div className="grid">
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Year</td>
                    <td>Description</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
            {props.vehicles.map(vehicle => <Vehicle key={vehicle.id} {...vehicle}/>)}
            </tbody>    
        </table>
    </div>
);   

class Vehicles extends React.Component {
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
    render(){
        return (
            <>
             <h1>Vehicles</h1>
            <VehicleList vehicles={this.state.vehicles}></VehicleList>
            
            </>
        )
    }
}

export default Vehicles;