import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home'
import voltarImg from '../../assets/backButton.png'
import { DropDescription } from '../../components/DropDescription';
type PratoScreenProps = {
    navigation: NativeStackNavigationProp<HomeStackParamsList, 'PratoScreen'>
    route: RouteProp<HomeStackParamsList, 'PratoScreen'>
}
export function PratoScreen({ navigation, route }: PratoScreenProps) {
  const { objectPrato } = route.params
  console.log(route.params.nomeRestaurante)
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
        <ScrollView style={{width: '100%', marginTop: 32, marginBottom: 12}} contentContainerStyle={{alignItems: 'center'}} >
            <View style={{width: '90%', height: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 40, borderColor: 'black', borderWidth: 1}}>
                <Text style={{fontWeight: 'bold'}}>FOTO</Text>
            </View> 
            <View style={{paddingHorizontal: 32, marginTop: 24, width: '100%'}}>
              <Text style={[styles.fontTextPrato, {fontWeight: '700'}]}>{objectPrato.nome}</Text>
              <DropDescription titulo='Descrição' descricao={`${objectPrato.descricao}`}/>
              <Text style={[styles.fontTextPrato, {marginTop: 16}]}>Tempo de preparo: {objectPrato.tempo_preparo} min</Text>
              <Text style={[styles.fontTextPrato, {color: '#971515', marginTop: 16, fontWeight: '600'}]}>R$ {`${objectPrato.preco.toFixed(2)}`.replace('.', ',')}</Text>
            </View>
            <TouchableOpacity style={[styles.botaoReservar, {marginTop: 32}]} onPress={()=>{
              navigation.navigate('PratoReserva', {
                idUser: route.params.idUser,
                objectPrato: objectPrato,
                idRestaurante: route.params.idRestaurante,
                nomeRestaurante: route.params.nomeRestaurante
              })
            }}>
              <Text style={{color: 'white'}}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}