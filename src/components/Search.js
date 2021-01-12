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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.zip !== this.props.zip) {
      this.componentDidMount();
    }
  }
  componentDidMount() {
    console.log(this.props.zip);
    console.log(this.state.zipCodes);
    console.log(typeof this.state.zipCodes);
    this.setState({
      isLoaded: false,
    })
    fetch("http://ctp-zip-api.herokuapp.com/zip/" + `${this.props.zip}`)
      .then((response) => {
        console.log(response)
        if(response.status !== 200){
          throw new Error("No result")
        }
        return response.json()
      })
      .then((result) => {
        this.setState({
          isLoaded: true,
        })
        if (result.length !== 0) {
          this.setState({
            isLoaded: true,
            zipCodes: result,
          });
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ 
          error,
          zipCodes: [],
          isLoaded: true,
        })
      })
  }

  render() {
    const { error, isLoaded, zipCodes } = this.state;
    if (this.state.zipCodes.length === 0) {
      return <h1>No results found</h1>;
    } else if (!isLoaded) {
      return <h4>Loading...</h4>;
    } else {
      return (
        <div>
          {zipCodes.map((code) => (
              <div className="card" key={code.RecordNumber}>
              <h4>
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
