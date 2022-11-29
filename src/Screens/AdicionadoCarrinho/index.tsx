import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home';
import closeImg from '../../assets/verifyBtn.png'
type AdicionadoCarrinhoProps = {
    navigation: NativeStackNavigationProp<HomeStackParamsList, 'AdicionadoAoCarrinho'>
}
export function AdicionadoCarrinho({ navigation }: AdicionadoCarrinhoProps) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)'}} onTouchStart={()=>{
      navigation.goBack()
    }} >
      <View style={[{width: 250, height: 160, backgroundColor: '#34ebb1', alignItems: 'center', paddingTop: 16, borderRadius: 16}, styles.shadowProp]}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={closeImg}
              style={{height: undefined, width: 32, aspectRatio: 500 / 500,}}
              resizeMode={'cover'}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16, alignSelf: 'center', textAlign: 'center'}}>Produto adicionado com sucesso!</Text>
      </View>
    </View>
  );
}