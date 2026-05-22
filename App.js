import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WeatherMap from './src/components/WeatherMap';
import LayersPanel from './src/components/LayersPanel';

export default function App() {
  const [layers, setLayers] = useState({
    temperature: true,
    precipitation: true,
    wind: true,
    pressure: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WeatherMap layers={layers} />
      <LayersPanel layers={layers} setLayers={setLayers} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});