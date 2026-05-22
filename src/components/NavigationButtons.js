import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavigationButtons = ({ onCenter, onFitAll }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onCenter}>
        <Text style={styles.buttonText}>🎯 Вернуться к центру</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onFitAll}>
        <Text style={styles.buttonText}>📍 Показать все маркеры</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 10,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NavigationButtons;