import React from 'react';
import { View, Image } from 'react-native';

import { styles } from './styles';
interface TabIconsProps {
    icon: string
}
export function TabIcons(props: TabIconsProps) {
  return (
    <Image source={{uri: `../../assets/${props.icon}.png`}}/>
  );
}