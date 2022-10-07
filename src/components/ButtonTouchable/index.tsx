import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { styles } from './styles';
interface ButtonTouchableProps{
  mensagem: string,
  uri: string
}

export function ButtonTouchable(props: ButtonTouchableProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.textTitle}>
        {props.mensagem}
      </Text>
      <Image source={{uri: props.uri}} resizeMethod={'scale'} resizeMode={'contain'} style={styles.imgFigure}/>
    </TouchableOpacity>
  );
}