import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home'
import voltarImg from '../../assets/backButton.png'

type RestauranteScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'RestaurantePage'>
  route: RouteProp<HomeStackParamsList, 'RestaurantePage'>
}
const dataTeste = [
  {
    id: 'sdxfgsdxffdssd-sdsdfdsdfd',
    nomePrato: 'Panqueca de queijo',
    uri_foto_prato: 'xd',
    valor: 9.80
  },
  {
    id: 'sdfsdfsxzcse-sdsdfdsdfd',
    nomePrato: 'Vilela',
    uri_foto_prato: 'xd',
    valor: 0.50
  },{
    id: 'xcgdfgdfgdfg-sdsdfdsdfd',
    nomePrato: 'Danilo',
    uri_foto_prato: 'xd',
    valor: 1.80
  },
  {
    id: 'tyughnfcgbdf-sdsdfdsdfd',
    nomePrato: 'Carlos',
    uri_foto_prato: 'xd',
    valor: 2.00
  },
  {
    id: 'bvcvbcfgdgdf-sdsdfdsdfd',
    nomePrato: 'Edivaldo',
    uri_foto_prato: 'xd',
    valor: 2.00
  },
  {
    id: 'dfgertegfdxdfvb-sdsdfdsdfd',
    nomePrato: 'Enzo',
    uri_foto_prato: 'xd',
    valor: 1.50
  },
  {
    id: 'dfgerdfgdfvcb-sdsdfdsdfd',
    nomePrato: 'Lasanha',
    uri_foto_prato: 'xd',
    valor: 18
  },
  {
    id: 'dfgerefgfbvc-sdsdfdsdfd',
    nomePrato: 'Panqueca de strogonoff',
    uri_foto_prato: 'xd',
    valor: 15
  },
  {
    id: 'eerwtwertfdgdf-sdsdfdsdfd',
    nomePrato: 'Panqueca de Macarrão',
    uri_foto_prato: 'xd',
    valor: 10
  }
]
export function RestauranteScreen({ navigation, route }: RestauranteScreenProps) {
  const RenderItems = ({ item }:{
    item: {
      id: string,
      nomePrato: string,
      uri_foto_prato: string,
      valor: number
    }
  }) => {
    return (
      <View style={{width: 140, marginLeft: '10%', marginBottom: 16}}>
        <TouchableWithoutFeedback onPress={()=>{
          navigation.navigate('PratoScreen', {
            id: item.id,
            idUser: route.params.idUser
          })
        }}>
          <View>
            <View style={{width: 120, height: 120, borderRadius: 30, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
              <Text>FOTO</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>{item.nomePrato}</Text>
            <Text>R${item.valor.toFixed(2)}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
        <Text style={styles.textTitle}>Pratos disponíveis em {route.params.nomeRestaurante}: </Text>
        <FlatList data={dataTeste} renderItem={RenderItems} numColumns={2} keyExtractor={(item, index ) => item.id} style={{width: '100%', marginTop: 32}}/>
    </View>
  );
}