import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { cities } from '../constants/cities';

const WeatherMap = () => {
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
        {cities.map(city => (
          <Marker
            key={city.id}
            coordinate={{ latitude: city.lat, longitude: city.lon }}
            title={city.name}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default WeatherMap;