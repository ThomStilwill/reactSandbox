import React from 'react';
import DataService from '../../services/data-service';
import { useParams, useNavigate } from 'react-router-dom';
import TextInput from '../shared/text-input';
import Validation from '../shared/validation';
import Form from '../shared/form';

class VehicleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          vehicle: {
              id: props.params.vehicleId,
              name: '',
              year: '',
              description: ''
          },  
          isLoaded: false,
          errors: {},
          submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        
        this.service = DataService.getInstance();
        this.vehicleId = props.params.vehicleId;
    }

    nameValidators = [
        Validation.validators.required(),
        Validation.validators.minLength(3)
    ]

    yearValidators = [
        Validation.validators.required(),
        Validation.validators.range(1900,2100)
    ]

    componentDidMount(){
        this.service.vehicle(this.vehicleId)
            .then(res => res.json())
            .then(
                (result) => 
                this.setState({
                    isLoaded:true,
                    vehicle: result
                }),
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    handleError = event => { 
        const { errors } = this.state;

        if(event.count>0){
            errors[event.name] = event.count;
        } else {
            delete errors[event.name];
        }

        this.setState({ errors });
    }

    handleChange = event => {
        const { vehicle } = this.state;
        vehicle[event.target.name] = event.target.value;
        this.setState({ vehicle });
    };

    handleCancel = () => { 
        this.props.navigate('/log/vehicles') 
    }
  
    handleSubmit = vehicle => {
        if (Object.keys(this.state.errors).length === 0) {
            this.service.save(vehicle.id,vehicle)
            .then(response=>{
                this.setState({ submitted: true });
                this.props.navigate('/log/vehicles') 
            })
            .catch(err=>{
                console.log(err);
            })
        }
    };

    render(){

        const {vehicle: {name, year, description }  
        } = this.state;

        return (
            <>
                <Form title="Edit Vehicle" 
                        onSubmit={this.handleSubmit} 
                        onCancel={this.handleCancel} 
                        state={this.state.vehicle}
                        errors={this.state.errors}>

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={this.handleChange}
                        onError={this.handleError}
                        placeholder="Enter name..."
                        validators={this.nameValidators}
                        />
                    
                    <TextInput
                        label="Year"
                        name="year"
                        type="text"
                        value={year}
                        onChange={this.handleChange}
                        onError={this.handleError}
                        placeholder="Enter year..."
                        validators={this.yearValidators}
                        />

                    <TextInput
                        label="Description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.handleChange}
                        onError={this.handleError}
                        placeholder="Enter description..."
                        />
                   
                </Form>
                <pre>{JSON.stringify(this.state.vehicle)}</pre>
            </>
        )
    }
}

export default (props) => (<VehicleEdit {...props} params={useParams()} navigate={useNavigate()}  />);
