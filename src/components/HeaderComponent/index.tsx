import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import logoGoWaiter from '../../assets/logo.png'
import imgUser from '../../assets/perfil-cima.png'
import { styles } from './styles';

interface navigationProps{
  navigation: {
    navigate: Function
  }
}

export function HeaderComponent({ navigation }: navigationProps) {
  return (
    <View style={styles.imagesContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Home')
        }}
      >
        <Image
          source={logoGoWaiter}
          style={styles.imageLogo}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={()=>{
          navigation.navigate('Perfil')
        }}
      >
        <Image
          source={imgUser}
          style={styles.imageUser}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}