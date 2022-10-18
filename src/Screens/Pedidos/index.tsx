import React from 'react';
import { View, Text } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';

import { styles } from './styles';

interface navigationProps{
  navigation: {
    navigate: Function
  },
  route: {
    params: {
      id: string,
      nome: string,
    }
  }
}

export function Pedidos({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
        <HeaderComponent navigation={ navigation }/>
    </View>
  );
}