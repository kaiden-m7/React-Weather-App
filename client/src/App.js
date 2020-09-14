import React, { Component } from 'react';

import './App.css';

import {  Main } from './components/Main/Main';
import {  Head } from './components/Head/Head';
import {  Footer } from './components/Footer/Footer';
import {  Weather } from './components/Weather/weather';
import { Form } from './components/Form/form.js';



class App extends React.Component {  
    state = {
      latitude:undefined,
      longitude:undefined,
    temperature: undefined,
    city: undefined,
    feels_like: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  componentDidMount = async ()=>{
    console.log("component mounted")

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(success=>{
         console.log(success)
         const {latitude, longitude} = success.coords
         this.setState({latitude, longitude})
         this.getWeatherAuto(latitude, longitude)

       })
    }
  }

  getWeatherAuto = async (lat,lon)=>{
    const API_KEY = "011d246d500f6dadbdd8b82cb9613fc3";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (true) {
      this.setState({
        temperature: data.main.temp.toFixed(0),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed.toFixed(0),
        icon: data.weather[0].icon,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        wind: undefined,
        icon: undefined,        
        error: "Please enter the values."
      });
    }
  }
  
  
  getWeatherForm = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const API_KEY = "011d246d500f6dadbdd8b82cb9613fc3";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp.toFixed(0),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed.toFixed(0),
        icon: data.weather[0].icon,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        wind: undefined,
        icon: undefined,        
        error: "Please enter the values."
      });
    }
  }
  render() {
    return (
      <div >
        <h1>{this.state.latitude} , {this.state.longitude}</h1>
        <Head />
        <Main /> 
        <Form getWeather={this.getWeather} />
        <Weather 
        temperature={this.state.temperature} 
        humidity={this.state.humidity}
        feels_like={this.state.feels_like}
        city={this.state.city}
        country={this.state.country}
        description={this.state.description}
        wind={this.state.wind}
        icon={this.state.icon}
        error={this.state.error}
        />  
        
        <Footer />

      </div>
    );
  }
}

export default App;
