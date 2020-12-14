import React, {useState}  from 'react';

function Button(props){
    return (
        <button onClick={() => props.onClickFunction(props.increment)}>
            {props.increment}
        </button>
    );
}

function Display(props) {
    return (
    <div>{props.message}</div>
    )
}

function App() {
    const [counter, setCounter] = useState(42);
    const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);
    return (
        <>
        <Button onClickFunction={incrementCounter} increment={1}/>
        <Button onClickFunction={incrementCounter} increment={5}/>
        <Button onClickFunction={incrementCounter} increment={10}/>
        <Button onClickFunction={incrementCounter} increment={100}/>
        <Display message={counter}/>
        </>
    )
}

class Basics extends React.Component {
    render(){
        return (
            <App/>
        )
    }
}

export default Basics;
