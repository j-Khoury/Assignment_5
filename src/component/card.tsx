import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

interface PageCardProps {
  photo: string;
  id: number;
  location: string;
  onDelete: () => void;
  onViewDetails: () => void;
}

const PageCard: React.FC<PageCardProps> = ({photo, onDelete}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: photo}} style={styles.image} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButton: {
    width: '100%', // Set the width of the button to 100% of the container
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default PageCard;
