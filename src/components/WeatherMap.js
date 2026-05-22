import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { cities } from '../constants/cities';
import { fetchWeather } from '../services/weatherService';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const loadWeather = async () => {
      const data = {};
      for (const city of cities) {
        try {
          const weather = await fetchWeather(city.lat, city.lon);
          data[city.id] = weather;
        } catch (error) {
          console.error(`Error loading weather for ${city.name}:`, error);
        }
      }
      setWeatherData(data);
    };
    loadWeather();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
      >
        {cities.map(city => {
          const weather = weatherData[city.id];
          const temp = weather?.main?.temp ? Math.round(weather.main.temp) : null;
          const weatherCode = weather?.weather?.[0]?.id;
          const icon = weatherCode ? getWeatherIcon(weatherCode) : '⌛';
          
          return (
            <Marker
              key={city.id}
              coordinate={{ latitude: city.lat, longitude: city.lon }}
              title={city.name}
              description={temp !== null ? `${icon} ${temp}°C` : 'Загрузка...'}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default WeatherMap;