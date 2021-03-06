import React from 'react';
import './App.css';
import Search from './components/Search';
import TodaysWeather from './components/TodaysWeather';
import FiveDayWeather from './components/FiveDayWeather';
import fetchJsonp from 'fetch-jsonp';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    };

  }

  fetchData(city) {
    var location = encodeURIComponent(city);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=a28ad46755d6e0b7f41ced42a6a94b71&units=imperial';
    var url = urlPrefix + location + urlSuffix;

    var self = this;

    fetchJsonp(url)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        self.setState({
          data: json
        });
        console.log('parsed json', json)
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  };

  render() {
    return (
      <div>
        <div className="topbar">
          <h1>Weather</h1>
        </div>
        <div className="mainbody">
          <Search fetchData={this.fetchData.bind(this)} />

          <TodaysWeather data={this.state.data} location={this.state.data.city} />

          <FiveDayWeather data={this.state.data} location={this.state.data.city} />
        </div>
      </div>

    );
  }
}

export default App;
