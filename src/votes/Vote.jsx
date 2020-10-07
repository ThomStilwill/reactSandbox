import React from 'react';
import './Vote.css';

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
            <li><span className="voter">{props.name}</span>
            { (props.name === props.selectedVoter ||props.showVotes) &&
                <label >{props.vote}</label>
            }
            </li> 
        </>        
    );
}

const Voters = (props) => (
    <>  
    <ul className="voters">
        {props.state.voters.map(voter => 
            <Voter {...voter} 
                    selectedVoter={props.state.selectedVoter} 
                    showVotes={props.state.showVotes}
            />
        )}
    </ul>
    </>
);

class Vote extends React.Component {
    state = {
        voters: data.voters,
        selectedVote: '',
        selectedVoter: 'Thomas',
        allVoted: false,
        showVotes: false
    }
    
    handleSelectedVote = (vote) => {
        const updatedvoters = this.state.voters.map(voter => {
            if (voter.name === this.state.selectedVoter) {
                voter.vote = vote;
            }
            return voter;
        });

        this.setState({voters: updatedvoters});
        this.setState({allVoted: updatedvoters.every(voter=>(voter))});
    }

    handleVoterChange = (event) => {
        this.setState({selectedVoter: event.target.value});
    }

    handleShowToggle = (event) => {
        this.setState({showVotes: !this.state.showVotes});
    }

    render(){
        return (
            <div className="voting">
                <VoteSelector onSelectedVote={this.handleSelectedVote}/> <br/>
                <label>My Vote: {this.state.selectedVote}</label>
                <Voters state={this.state}/>

                <hr/>
                <label>Test</label>{this.state.selectedVote}<br/>
                
                <select value={this.state.selectedVoter} 
                        onChange={this.handleVoterChange}>
                    {this.state.voters.map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                            ))}                    
                </select>

                <button onClick={this.handleShowToggle}>Toggle All Votes.</button>
                { this.state.showVotes | toString }
            </div>
        );
    }
}

export default Vote;
