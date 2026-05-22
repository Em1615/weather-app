import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LayersPanel = ({ layers, setLayers }) => {
  const toggleLayer = (layerName) => {
    setLayers({ ...layers, [layerName]: !layers[layerName] });
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Слои данных</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, layers.temperature && styles.activeButton]}
          onPress={() => toggleLayer('temperature')}
        >
          <Text style={styles.buttonText}>🌡️ Температура</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, layers.precipitation && styles.activeButton]}
          onPress={() => toggleLayer('precipitation')}
        >
          <Text style={styles.buttonText}>🌧️ Осадки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, layers.wind && styles.activeButton]}
          onPress={() => toggleLayer('wind')}
        >
          <Text style={styles.buttonText}>💨 Ветер</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, layers.pressure && styles.activeButton]}
          onPress={() => toggleLayer('pressure')}
        >
          <Text style={styles.buttonText}>📊 Давление</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    margin: 4,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default LayersPanel;