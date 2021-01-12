import React from "react";
import App from "./App";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      zipCodes: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zip !== this.props.zip) {
      this.componentDidMount();
    }
  }
  componentDidMount() {
    console.log(this.props.zip);
    console.log(this.state.zipCodes);
    console.log(typeof this.state.zipCodes);
    fetch("http://ctp-zip-api.herokuapp.com/zip/" + `${this.props.zip}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.length !== 0) {
          this.setState({
            isLoaded: true,
            zipCodes: result,
          });
        } else {
          this.setState({
            isLoaded: true,
            zipCodes: [],
          });
        }
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { error, isLoaded, zipCodes } = this.state;
    if (this.state.zipCodes.length === null || "") {
      return <div>No results found</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {zipCodes.map((code) => (
              <div className="card">
              <h4 key={code.RecordNumber}>
                {code.City},{code.State}
              </h4>
              <p>Location: ({code.Lat}, {code.Long})</p>
              <p>Estimated Population: {code.EstimatedPopulation}</p>
              <p>Total Wages: {code.TotalWages}</p>
              </div>
            ))}
        </div>
      );
    }
  }
}

export default Search;
