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
          formState: {
              errors: []
          },
          submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        
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
                        isLoaded: false
                    });
                }
            )
    }

    handleStateChange = event => { 
        const formState = this.state.formState;

        if(event.errors.length){
            formState.errors[event.name] = event.errors;
        } else {
            delete formState.errors[event.name];
        }

        this.setState({ formState });
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
        if (this.state.formState.errors.length === 0) {
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
                        formState={this.state.formState}
                        state={this.state.vehicle}
                        >

                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={this.handleChange}
                        onStateChange={this.handleStateChange}
                        placeholder="Enter name..."
                        validators={this.nameValidators}
                        />
                    
                    <TextInput
                        label="Year"
                        name="year"
                        type="text"
                        value={year}
                        onChange={this.handleChange}
                        onStateChange={this.handleStateChange}
                        placeholder="Enter year..."
                        validators={this.yearValidators}
                        />

                    <TextInput
                        label="Description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.handleChange}
                        onStateChange={this.handleStateChange}
                        placeholder="Enter description..."
                        />
                </Form>
            </>
        )
    }
}

export default (props) => (<VehicleEdit {...props} params={useParams()} navigate={useNavigate()}  />);
