import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import imgUser from '../../assets/perfil-cima.png'
import { styles } from './styles';
import { RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import myTabParamsList from '../../type'
type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Perfil'>
  route: RouteProp<myTabParamsList, 'Perfil'>;
}
export function Perfil({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation} uri_foto_usuario={route.params.uri_foto_usuario}/>
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