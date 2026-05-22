import React, { useState, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WeatherMap from './src/components/WeatherMap';
import LayersPanel from './src/components/LayersPanel';
import NavigationButtons from './src/components/NavigationButtons';

export default function App() {
  const [layers, setLayers] = useState({
    temperature: true,
    precipitation: true,
    wind: true,
    pressure: false,
  });
  
  const mapRef = useRef();

  const handleCenter = () => {
    mapRef.current?.centerMap();
  };

  const handleFitAll = () => {
    mapRef.current?.fitAllMarkers();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WeatherMap ref={mapRef} layers={layers} />
      <LayersPanel layers={layers} setLayers={setLayers} />
      <NavigationButtons onCenter={handleCenter} onFitAll={handleFitAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});