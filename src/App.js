import React, { Component } from 'react';
import './App.css';
import Button from './components/Button'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true
    };
    this.handleClickCat = this.handleClickCat.bind(this)
    this.handleClickDog = this.handleClickDog.bind(this)
  }

// Setting the state for Cat Button as True
  handleClickCat(){
    this.setState( {check: true}
    );
  }

// Setting the state for Dog Button as False
  handleClickDog(){
    this.setState( {check: false}
    );
  }

  render() {
      return (
        <div className="AppContainer">
        <div className="AppButtonContainer">
          <button className = "butn" onClick = {this.handleClickCat}> Cat </button>
          <button className = "butn" onClick = {this.handleClickDog}> Dog </button>
        </div>
          <Button check={this.state.check} />
        </div>
      );
  }
}

export default App;
