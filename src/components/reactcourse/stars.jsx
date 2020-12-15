import React, {useEffect, useState}  from 'react';

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const gameStates = {
    won: 'won',
    lost: 'lost',
    active:'active'
}

const numberStates = {
    used: 'used',
    wrong: 'wrong',
    candidate: 'candidate',
    available: 'available'
}

const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)so the team
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
        }
        }
    }
    return sums[utils.random(0, sums.length - 1)];
    },
};

const StarsDisplay = props => (
    <>
    {utils.range(1, props.count).map(starId => 
        <div key={starId} className="star" />    
    )}
    </>
)

const ButtonDisplay = props => {
    const candidatesAreWrong = utils.sum(props.candidateNums) > props.stars;
    const numberStatus = number => {
        if(!props.availableNums.includes(number)) {
            return numberStates.used;
        }
        if(props.candidateNums.includes(number)) {
            return candidatesAreWrong ? numberStates.wrong: numberStates.candidate;
        }
        return numberStates.available;
    }
    
    return (
        <>
            {utils.range(1, 9).map(number => 
                <PlayNumber 
                    key={number} 
                    number={number}
                    status={numberStatus(number)}
                    onClick={props.onClick}
                />
            )}
        </>
    )
}

const PlayNumber = props => (
    <button 
        className="number" 
        style={{backgroundColor: colors[props.status]}}
        onClick={()=> props.onClick(props.number,props.status)}
    >
        {props.number}
    </button>        
)

const PlayAgain = props => (
    <div className="game-done">
        <div
            className="message"
            style={{color:props.gameStatus === gameStates.lost ? 'red' : 'green'}} >
            {props.gameStatus === gameStates.lost ? 'Game Over' : 'Nice'}
        </div>
        <button onClick={props.onClick}>Play Again</button>
    </div>
)

const useGameState = () => {
    const [stars, setStars] = useState(utils.random(1,9));
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(()=>{
        if(secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft-1)
            },1000);
            return () => clearTimeout(timerId)
        }
    });

    const setGameState = (newCandidateNums) => {
        if(utils.sum(newCandidateNums)!==stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums,9))
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }   

    return {stars,availableNums,candidateNums,secondsLeft,setGameState};
}

const Game = props => {

    const {stars,availableNums,candidateNums,secondsLeft,setGameState} = useGameState();

    const gameStatus = availableNums.length === 0
            ? gameStates.won
            : secondsLeft === 0 ? gameStates.lost : gameStates.active;

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== gameStates.active || currentStatus === numberStates.used) {
            return;
        }

        const newCandidateNums = 
            currentStatus === numberStates.available
            ? candidateNums.concat(number)
            : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidateNums);
    }

    return (
    <div className="game">
        <div className="help">
            Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
            <div className="left">
                { gameStatus === gameStates.active
                    ? (<StarsDisplay count={stars}/>)
                    : (<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>)
                } 
            </div>
            <div className="right">
                <ButtonDisplay 
                    onClick={onNumberClick} 
                    availableNums={availableNums} 
                    candidateNums={candidateNums}
                    stars={stars}
                />
                
            </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
    );
};
  
const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}

class Stars extends React.Component {
    render(){
        return (
            <StarMatch/>
        )
    }
}

export default Stars;
