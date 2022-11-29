import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home'
import voltarImg from '../../assets/backButton.png'
import axios from 'axios';
import { ip } from '../../code/ipMachine';

type RestauranteScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'RestaurantePage'>
  route: RouteProp<HomeStackParamsList, 'RestaurantePage'>
}
export function RestauranteScreen({ navigation, route }: RestauranteScreenProps) {
  const [pratos, setPratos] = useState([])
  console.log(route.params.nomeRestaurante)
  const RenderItems = ({ item }:{
    item: {
      id: string,
      nome: string,
      uri_foto_prato: string,
      preco: number,
      ingredientes: string,
      descricao: string,
      disponivel: boolean,
      tempo_preparo: number,
      acompanhamentos: string
    }
  }) => {
    return (
      <View style={{width: 140, marginBottom: 16}}>
        <TouchableWithoutFeedback onPress={()=>{
          navigation.navigate('PratoScreen', {
            objectPrato: item,
            idUser: route.params.idUser,
            idRestaurante: route.params.idRestaurante,
            nomeRestaurante: route.params.nomeRestaurante
          })
        }}>
          <View>
            <View style={{width: 120, height: 120, borderRadius: 30, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
              <Text>FOTO</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>{item.nome}</Text>
            <Text>R${item.preco.toFixed(2)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  useEffect(()=>{
    axios.get(`http://${ip}:3333/pratos/restaurante?id=${route.params.idRestaurante}`).then(resposta => {
      setPratos(resposta.data)
    })
  }, [])
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
        <Text style={styles.textTitle}>Pratos disponíveis em {route.params.nomeRestaurante}: </Text>
        <FlatList data={pratos} renderItem={RenderItems} numColumns={2} keyExtractor={(item, index ) => item.id} style={{width: '100%', marginTop: 32}} columnWrapperStyle={{justifyContent: 'space-around'}}/>
    </View>
  );
}