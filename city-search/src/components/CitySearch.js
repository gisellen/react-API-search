import React, { Component } from 'react'

class CitySearch extends Component {
    constructor(props){
        super(props);
        this.state ={
            error: null,
            isLoaded: false,
            zipCodes: [],
        };
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.zip !== this.props.zip) {
            this.componentDidMount();
          }
    }

    componentDidMount(){
        this.setState({
            isLoaded: false,
        })
        fetch("http://ctp-zip-api.herokuapp.com/city/" + (this.props.zip).toUpperCase())
        .then((response) => {
            console.log(response)
            if(response.status !== 200){
                throw new Error("No result")
            }
            return response.json()
        })
        .then((result) => {
            console.log(result)
            this.setState({
                isLoaded: true,
                zipCode: ''
            })
            if (result.length !== 0) {
                this.setState({
                  isLoaded: true,
                  zipCodes: result,
                });
              }
        })
        .catch(error => {
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
                <h1>Zip Codes Found:</h1>
                <ul>
                {zipCodes.map((code) => (
                  <li className="item">
                      {code}
                  </li>
                ))}
                </ul>
            </div>
          );
        }
      }
}

export default CitySearch
