import React, { useState, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
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
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌤️ Прогноз погоды</Text>
        <Text style={styles.headerSubtitle}>Интерактивная карта</Text>
      </View>
      <View style={styles.mapContainer}>
        <WeatherMap ref={mapRef} layers={layers} />
      </View>
      <LayersPanel layers={layers} setLayers={setLayers} />
      <NavigationButtons onCenter={handleCenter} onFitAll={handleFitAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a237e',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: '#1a237e',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#b3e5fc',
    marginTop: 2,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});