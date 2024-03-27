import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Btn from '../component/btnCamera.tsx';

interface CameraProps {
  navigation: any;
}
const CameraPage: FC<CameraProps> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Btn
          btnLabel="Take Photo"
          onPress={() => props.navigation.navigate('Photo')}
          bgColor="blue"
          textColor="white"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Btn
          btnLabel="Open Gallery"
          onPress={() => props.navigation.navigate('Gallery')}
          bgColor="blue"
          textColor="white"
        />
        <Btn
          btnLabel="Open maps"
          onPress={() => props.navigation.navigate('Maps')}
          bgColor="blue"
          textColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
});

export default CameraPage;
