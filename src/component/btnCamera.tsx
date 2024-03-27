import React, {FC} from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface BtnProps extends TouchableOpacityProps {
  bgColor: string;
  btnLabel: string;
  textColor: string;
}

const Btn: FC<BtnProps> = ({bgColor, btnLabel, textColor, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: 250,
        height: 60,
        paddingVertical: 10,
        marginVertical: 17,
      }}>
      <Text style={{color: textColor, fontSize: 28, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;
