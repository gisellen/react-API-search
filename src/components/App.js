import React from "react";
import "../App.css";
import Search from "./Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="search">
        <form>
          <input
            type="text"
            name="text"
            placeholder="try 10016"
            onChange={this.handleChange}
          />
        </form>
        <h1>{this.state.value}</h1>
        <Search zip={this.state.value}/>
      </div>
    );
  }
}

export default App;
