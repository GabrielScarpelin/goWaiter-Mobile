import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import logoGoWaiter from '../../assets/logo.png'
import { styles } from './styles';
import imgUser from '../../assets/perfil-cima.png'
interface navigationProps{
  navigation: {
    navigate: Function
  },
  uri_foto_usuario: string
}

export function HeaderComponent({ navigation, uri_foto_usuario }: navigationProps) {
  console.log(uri_foto_usuario)
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
          source={{uri: uri_foto_usuario ? "http://192.168.10.106:3333"+uri_foto_usuario.replace('.', '') : imgUser}}
          style={styles.imageUser}
          resizeMode={'cover'}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}