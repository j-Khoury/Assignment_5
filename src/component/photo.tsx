import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, Linking, Pressable, StyleSheet} from 'react-native'; // Added StyleSheet import
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen: React.FC = () => {
  const {requestPermission, hasPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  // add photos to db function
  async function addCourtImage(
    url: string,
    imageUrl: string,
    location: string,
  ): Promise<any> {
    try {
      console.log('testing in the funciton', imageUrl);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({location, photo: 'file:///' + imageUrl}),
      });

      if (!response.ok) {
        throw new Error('Failed to add court image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding court image:', error);
      throw error;
    }
  }

  // Usage
  const url =
    'https://directus-production-557c.up.railway.app/items/court_image';

  const currentLocation = 'https://g.co/kgs/3J3v2va';

  const takePhotoAndSave = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      if (photo) {
        try {
          console.log('photo full data', photo);
          await CameraRoll.save(photo.path);
          addCourtImage(url, photo.path, currentLocation)
            .then(data => {
              console.log('Court image added successfully:', data);
            })
            .catch(error => {
              console.error('Failed to add court image:', error);
            });
          console.log('Photo saved successfully');
        } catch (error) {
          console.error('Error saving photo:', error);
        }
      }
    }
  };

  useEffect(() => {
    const checkAndOpenCamera = async () => {
      if (hasPermission) {
        setIsCameraVisible(true);
      } else {
        const isAccessGranted = await requestPermission();
        if (!isAccessGranted) {
          Alert.alert(
            'Permission required',
            'Open settings to grant permission',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open settings',
                style: 'default',
                onPress: async () => {
                  await Linking.openSettings();
                },
              },
            ],
          );
        } else {
          setIsCameraVisible(true);
        }
      }
    };

    checkAndOpenCamera();
  }, [hasPermission, requestPermission]);
  return (
    <SafeAreaView style={styles.container}>
      {isCameraVisible && device && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <Pressable onPress={takePhotoAndSave} style={styles.captureButton} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default CameraScreen;
