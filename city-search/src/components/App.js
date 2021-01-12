import React, { Component } from 'react'
import "../App.css";
import CitySearch from "./CitySearch"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
    console.log(event.target.value)
    this.setState({
      value: event.target.value,
    })
  }
  render() {
    return (
      <div className="search">
      <form>
        <input
          type="text"
          placeholder="try staten island"
          onChange={this.handleChange}
        />
      </form>
      <CitySearch zip={this.state.value}/>
    </div>
    )
  }
}

export default App
