import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const API_KEY = 'd2caa898de033e2b17b3f204b396ea0d';

function App() {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cityDetails, setCityDetails] = useState({});
  const [mapKey, setMapKey] = useState(0);
  const [loading, setLoading] = useState(false);

  // Função para buscar as cidades da API OpenWeather
  const getCitySuggestions = async (value) => {
    if (value.length > 2) {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
      );
      setCitySuggestions(response.data);
    } else {
      setCitySuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => getCitySuggestions(value);

  const onSuggestionsClearRequested = () => setCitySuggestions([]);

  const onSuggestionSelected = (event, { suggestion }) => {
    setCity(suggestion.name);
    setCityDetails(suggestion);
  };

  const onChange = (event, { newValue }) => setCity(newValue);

  const getWeather = async () => {
    if (city) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        setWeatherData(response.data);
        setMapKey((prevKey) => prevKey + 1);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        setForecastData(forecastResponse.data);
      } catch (err) {
        alert('Cidade não encontrada.');
      } finally {
        setLoading(false);
      }
    }
  };

  const renderIcon = (main) => {
    const icons = {
      clear: '☀️',
      rain: '🌧️',
      clouds: '☁️',
      default: '❓',
    };
    return icons[main.toLowerCase()] || icons.default;
  };

  const processForecastData = () => {
    if (!forecastData) return [];

    const days = {};
    forecastData.list.forEach((forecast) => {
      const date = new Date(forecast.dt_txt).toLocaleDateString();
      if (!days[date]) days[date] = [];
      days[date].push(forecast);
    });

    return Object.values(days).map((day) => day[0]);
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            setWeatherData(response.data);
            setCityDetails({
              lat: latitude,
              lon: longitude,
              name: response.data.name,
            });
            setMapKey((prevKey) => prevKey + 1);

            const forecastResponse = await axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            setForecastData(forecastResponse.data);
          } catch (err) {
            alert('Não foi possível obter os dados do tempo para a sua localização.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setLoading(false);
          alert('Não foi possível obter a localização.');
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  };

  const inputProps = {
    placeholder: 'Digite o nome da cidade',
    value: city,
    onChange,
  };

  return (
    <div className="container">
      <h1>Temperatura e Condições do Clima</h1>
      <h4>Criado por Rafael Passos</h4>
      <h4>Base de Dados: OpenWeather</h4>
      <br />
      <div className="main-content">
        <div className="form-container">
          <Autosuggest
            suggestions={citySuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (
              <div>
                {suggestion.name}, {suggestion.state || 'Estado não disponível'}
              </div>
            )}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
          <br />
          <button onClick={getWeather} className="search-button" disabled={loading}>
            {loading ? 'Carregando...' : 'Buscar'}
          </button>
          <button onClick={locateUser} className="locate-button" disabled={loading}>
            {loading ? 'Localizando...' : 'Me Localize'}
          </button>
          <br />
          {weatherData && (
            <div className="weather-info">
              <h2>
                {weatherData.name}, {cityDetails.state || 'Estado não disponível'}, {cityDetails.country}
              </h2>
              <p>Temperatura: {weatherData.main.temp}°C</p>
              <p>Condições climáticas: {weatherData.weather[0].description}</p>
              <div className="additional-info">
                <p>Velocidade do Vento: {weatherData.wind.speed} m/s</p>
                <p>Umidade: {weatherData.main.humidity}%</p>
                <p>Pressão Atmosférica: {weatherData.main.pressure} hPa</p>
              </div>
            </div>
          )}
        </div>

        <div className="map-container">
          {cityDetails.lat && cityDetails.lon && (
            <MapContainer key={mapKey} center={[cityDetails.lat, cityDetails.lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[cityDetails.lat, cityDetails.lon]}>
                <Popup>
                  {weatherData?.name}, {cityDetails.state || 'Estado não disponível'}, {cityDetails.country}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>

      {forecastData && (
        <div className="forecast-info">
          <h3>Previsão para os próximos 5 dias</h3>
          <div className="forecast-cards">
            {processForecastData().map((forecast, index) => (
              <div className="forecast-card" key={index}>
                <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                <p>Temperatura: {forecast.main.temp}°C</p>
                <div>
                  {renderIcon(forecast.weather[0].main)}
                  <p>Clima: {forecast.weather[0].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      <footer className="footer">
        <p>Climatic 1.0</p>
      </footer>
    </div>
  );
}

export default App;
