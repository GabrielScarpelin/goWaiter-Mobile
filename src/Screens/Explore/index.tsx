import React from 'react';
import { View, Text } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';

import { styles } from './styles';

interface navigationProps{
  navigation: {
    navigate: Function
  }
}

export function Explore({ navigation }: navigationProps) {
  return (
    <View style={styles.container}>
        <HeaderComponent navigation={ navigation }/>
    </View>
  );
}