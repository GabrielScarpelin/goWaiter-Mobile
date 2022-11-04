import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home'
import voltarImg from '../../assets/backButton.png'
type PratoScreenProps = {
    navigation: NativeStackNavigationProp<HomeStackParamsList, 'PratoScreen'>
    route: RouteProp<HomeStackParamsList, 'PratoScreen'>
}
export function PratoScreen({ navigation, route }: PratoScreenProps) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center', marginTop: 32}}>
            <View style={{width: '90%', height: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 40, borderColor: 'black', borderWidth: 1}}>
                <Text style={{fontWeight: 'bold'}}>FOTO</Text>
            </View>
            <Text>NOME</Text>
            <Text>RESTAURANTE</Text>
            <Text>TEMPO PREPARO</Text>
            <Text>PREÇO</Text>
            <TouchableOpacity style={[styles.botaoReservar, {marginTop: 32}]}><Text style={{color: 'white'}}>Adicionar ao carrinho</Text></TouchableOpacity>
        </View>
    </View>
  );
}