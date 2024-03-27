import React, {ReactNode} from 'react';
import {View, ImageBackground} from 'react-native';
interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({children}) => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/camera2.png')}
        style={{height: '100%'}}
      />
      <View style={{position: 'absolute'}}>{children}</View>
    </View>
  );
};

export default Background;
