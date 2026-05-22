import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { cities } from '../constants/cities';
import { fetchWeather } from '../services/weatherService';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherMap = React.forwardRef(({ layers }, ref) => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    centerMap: () => {
      mapRef.current?.animateToRegion({
        latitude: 55.751244,
        longitude: 37.618423,
        latitudeDelta: 10,
        longitudeDelta: 10,
      });
    },
    fitAllMarkers: () => {
      const coordinates = cities.map(city => ({
        latitude: city.lat,
        longitude: city.lon,
      }));
      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    },
  }));

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      const data = {};
      let hasError = false;
      
      for (const city of cities) {
        try {
          const weather = await fetchWeather(city.lat, city.lon);
          data[city.id] = weather;
        } catch (error) {
          console.error(`Error loading weather for ${city.name}:`, error);
          hasError = true;
          data[city.id] = { error: error.message };
        }
      }
      setWeatherData(data);
      setLoading(false);
      
      if (hasError) {
        Alert.alert(
          'Ошибка загрузки',
          'Не удалось загрузить погоду для некоторых городов. Проверьте подключение к интернету.',
          [{ text: 'OK' }]
        );
      }
    };
    loadWeather();
  }, []);

  const getDescription = (cityId, weather) => {
    if (!weather) return 'Загрузка...';
    if (weather.error) return `❌ ${weather.error}`;
    
    const parts = [];
    const temp = weather.main?.temp ? Math.round(weather.main.temp) : null;
    const weatherCode = weather.weather?.[0]?.id;
    const icon = weatherCode ? getWeatherIcon(weatherCode) : '';
    const windSpeed = weather.wind?.speed;
    const pressure = weather.main?.pressure;
    
    if (layers.temperature && temp !== null) parts.push(`${icon} ${temp}°C`);
    if (layers.precipitation && weather.weather?.[0]?.description) {
      parts.push(weather.weather[0].description);
    }
    if (layers.wind && windSpeed) parts.push(`💨 ${windSpeed} м/с`);
    if (layers.pressure && pressure) parts.push(`📊 ${pressure} гПа`);
    
    return parts.join(' | ') || city.name;
  };

  if (loading && Object.keys(weatherData).length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>Загрузка погоды...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
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
          const description = getDescription(city.id, weather);
          
          return (
            <Marker
              key={city.id}
              coordinate={{ latitude: city.lat, longitude: city.lon }}
              title={city.name}
              description={description}
            />
          );
        })}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default WeatherMap;