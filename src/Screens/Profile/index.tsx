import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import imgUser from '../../assets/perfil-cima.png'
import { styles } from './styles';


interface navigationProps{
  navigation: {
    navigate: Function
  },
  route: {
    params: {
      id: string,
      nome: string,
      uri_foto_usuario: string,
      email: string,
      telefone: string
    }
  }
}
export function Profile({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <View style={{ display: "flex", alignItems: "center", marginTop: 80 }}>
        <Image
          source={imgUser}
          style={{ width: 400 }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
        <TouchableOpacity>
          <Text style={{ textAlign: "center", marginTop: 6 }}>
            Alterar foto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}