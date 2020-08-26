import React from 'react';

const data = {
    self: 'Thomas',
    voters: [
        {
            key: 1,
            name: 'Thomas',
            vote: null
        },
        {
            key: 2,
            name: 'Richard',
            vote: null
        },
        {
            key: 3,
            name: 'Harold',
            vote: null
        }
    ]
}

class VoteButton extends React.Component {
    render() {
        return (
            <button onClick={() => this.props.onClickFunc(this.props.value)}>
                {this.props.value}
            </button>
        );
    };

    // static propTypes = {
    //     onClickFunc: React.PropTypes.func.isRequired
    //     //value: React.PropTypes.string.isRequired
    // }
}

class VoteSelector extends React.Component {
    state = {
        vote: ''
    }
    
    onClickHandler = (value) => {
        console.log('x:' + value);
        this.props.onSelectedVote(value);
    };

    render() {
        return (
            <>
                <VoteButton onClickFunc={this.onClickHandler} value={1}/> 
                <VoteButton onClickFunc={this.onClickHandler} value={2}/> 
                <VoteButton onClickFunc={this.onClickHandler} value={3}/> 
                <VoteButton onClickFunc={this.onClickHandler} value={5}/> 
                <VoteButton onClickFunc={this.onClickHandler} value={8}/> 
            </>
        )
    };
}  

const Voter = (props) => {
    return (
        <>
            <li>{props.name}</li> 
            { props.name === props.self &&
                <label>{props.vote}</label>
            }
        </>        
    );
}

const Voters = (props) => (
    <>  
    <ul>
        {props.state.voters.map(voter => <Voter {...voter} self={props.state.selectedVoter} vote={props.state.selectedVote}/>)}
    </ul>
    </>
);

class Vote extends React.Component {
    state = {
        voters: data.voters,
        selectedVote: '',
        selectedVoter: data.self,
    }
    
    handleSelectedVote = (vote) => {
        this.setState({selectedVote: vote})
    }

    render(){
        return (
            <>  
            <VoteSelector onSelectedVote={this.handleSelectedVote}/> <br></br>
            <label>My Vote: {this.state.selectedVote}</label>
            <Voters state={this.state}/>
            </>
        );
    }
}

export default Vote;


/*

commmunication

observer pattern - by directional

parent to child by event 

*/