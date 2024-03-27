import React, {FC} from 'react';
import {View, Text} from 'react-native';
import Background from '../component/backGround.tsx';
import Btn from '../component/btn.tsx';
interface HomeProps {
  navigation: any;
}

const Home: FC<HomeProps> = props => {
  return (
    <Background>
      <View style={{marginHorizontal: 50, marginVertical: 220}}>
        <Text
          style={{
            color: 'white',
            fontSize: 48,
            fontWeight: '900',
            paddingBottom: 220,
            textAlign: 'center',
          }}>
          Point, shoot, and share your story.
        </Text>
        <Btn
          btnLabel="Get Started"
          onPress={() => props.navigation.navigate('Camera')}
          bgColor="white"
          textColor="black"
        />
      </View>
    </Background>
  );
};

export default Home;
