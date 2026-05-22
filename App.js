import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WeatherMap from './src/components/WeatherMap';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WeatherMap />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});