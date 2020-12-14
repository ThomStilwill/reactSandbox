import React, {useState}  from 'react';
import axios  from 'axios';

const testData = [];

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
    </div>
);

const Card = (props) => {

    const profile = props;
    return (
        <div className="github-profile">
            <img src={profile.avatar_url} alt="" />
            <div className="info">
                <div className="name">{profile.name}</div>
                <div className="company">{profile.company}</div>
            </div>
        </div>
    )
}

const Form =(props) =>{

    const [userName,setUserName] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setIsLoading(true);

        try {
            const resp = await axios.get(`http://api.github.com/users/${userName}`);
            props.onSubmit(resp.data);
            setUserName('');
        } catch(e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const errorMessage = error ? <p className="error">There was a problem retrieving the information.</p> : '';
    const loadingMessage = isLoading ? <p style={{textAlign:'center'}}>Loading...</p> : '';

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" 
                    placeholder="username" 
                    onChange={event => setUserName(event.target.value) }
                    value= {userName}
                    required 
            />
            <button>Add card</button>
           
        </form>
        {errorMessage}
        {loadingMessage}
        </>
    )
}

class App extends React.Component {

    state = {
        profiles: testData,
    };

    addNewProfile =(newprofile) => {

        this.setState(prevState => ({
            profiles: [...prevState.profiles, newprofile]
        }))
        console.log(newprofile)
    }
    render() {
        return (
            <div className="cardapp">
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile}/>
                <CardList profiles={this.state.profiles}/>
            </div>
        )
    }
}

class Cards extends React.Component {
    render(){
        return (
            <App title="Cards"/>
        )
    }
}

export default Cards;
