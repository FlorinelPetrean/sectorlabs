import React, { Component } from 'react';
import GistsTable from '../components/GistsTable';

class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            buttonClicked: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleChange(event) {    
        this.setState({
            username: event.target.value,
            // buttonClicked: false
        });  
    }

    handleButtonClick() {
        this.setState({
            buttonClicked: true
        })
    }

    render() {
        return(
            <div>
                <div>Welcome to Gist API application</div>
                <form>
                    <label> Please enter username: 
                        <input 
                        type="text" 
                        placeholder="Search..." 
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                    </label>
                </form>
                <div><button onClick={this.handleButtonClick}>Just do it!</button></div>

                { this.state.buttonClicked &&
                <GistsTable username={this.state.username}/>
                }
            
            </div>


        )


    }
} export default HomePage;