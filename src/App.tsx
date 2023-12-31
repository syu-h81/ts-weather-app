import { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import './App.css';

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  });
  const getWeather = (e: any) => {
    e.preventDefault();
    fetch(`https://api.weatherapi.com/v1/current.json?key=d6ae960afd90457090a31016230209&q=${city}&aqi=no`)
         .then(res => res.json())
         .then(data => {
            setResults({
              country: data.location.country,
              cityName: data.location.name,
              temperature: data.current.temp_c,
              conditionText: data.current.condition.text,
              icon: data.current.condition.icon
            })       
         })
  }
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <Title />
          <Form getWeather={getWeather} setCity={setCity} />
          <Results results={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
