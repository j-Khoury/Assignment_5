import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screen/homePage.tsx';
import Camera from './src/screen/camera.tsx';
import Gallery from './src/screen/gallery.tsx';
import Photo from './src/component/photo.tsx';
import Maps from './src/screen/maps.tsx';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{title: 'Camera'}}
          />
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="Photo" component={Photo} />
          <Stack.Screen name="Maps" component={Maps} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MyStack;
