import React, { Component } from 'react';

class Giphy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://api.giphy.com/v1/gifs/search?q=cat&api_key=MqDqMchmd6dP25UQZTJAhDDauZEblDLT&limit=20")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let style = {
        fontSize:"40px",
        textAlign:"center",
        color: "cyan"
      }
      let ulStyle={
        listStyle: "none"
      }
      return (
        <div>
          <h1 style={style}>Giphy Cats</h1>
          <ul style={ulStyle}>
            {items.map(item => (
              <li key={item.id}>
                <a href={item.url} targe><img src={item.images.original.url} /></a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Giphy