import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, ScrollView, FlatList } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import { RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import myTabParamsList from '../../type'
import { PratoReserva } from '../PratoReserva';
import { RestauranteScreen } from '../RestauranteScreen';
import axios from 'axios';
import imgRefeicao from '../../assets/refeicoes.png'
import setaParaBaixo from '../../assets/setaParaBaixo.png'
import logoGoWaiter from '../../assets/logo.png'
import { ip } from '../../code/ipMachine'


const Stack = createNativeStackNavigator()
type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Search'>
  route: RouteProp<myTabParamsList, 'Search'>;
}
const RenderItems = ({ item }:{
  item: {
    distance: number,
    endereco: string,
    id: string,
    nome: string,
    uri_foto_restaurante: string,
    categoria_principal: string
  }
}) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={()=>{

      }}>
        <View>
          <Image source={{uri: `http://${ip}:3333${console.log(item.uri_foto_restaurante.replace('.', ''))}`}}/>
          <Text>{item.nome}</Text>
          <Text>{item.endereco}</Text>
          <Text>{item.categoria_principal}</Text>
          <Text>{item.distance.toFixed(2)}Km</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
const RestauranteSearchFoods = ()=>{
  const [selectedBtn, setSelected] = useState(1)
  const [atualRestaurantesRequested, setAtualRestaurantes] = useState([])
  useEffect(()=>{
    axios.get(`http://${ip}:3333/restaurantes/-23.6831521,-46.6625531`).then(resposta => {
      setAtualRestaurantes(resposta.data)
      console.log(atualRestaurantesRequested)
    })
  }, [])
  return (
    <View>
      <View style={styles.containerSelectCategory}>
        <Text style={{ marginRight: 8, fontSize: 22, marginLeft: 33 }}>
          Selecione a categoria
        </Text>
        <Image source={setaParaBaixo} />
      </View>
      <View>
        <ScrollView style={styles.scrollView} horizontal={true}>
          <View style={styles.containerButtonSelect}>
            <TouchableWithoutFeedback onPress={()=>{
              setSelected(1)
              axios.get(`http://${ip}:3333/restaurantes/-23.6831521,-46.6625531`).then(resposta => setAtualRestaurantes(resposta.data))
            }}>
              <Image source={imgRefeicao} style={selectedBtn === 1 ? styles.activeImage : styles.noActiveImage} />
            </TouchableWithoutFeedback>
            <Text>Geral</Text>
          </View>
          <View style={styles.containerButtonSelect}>
            <TouchableWithoutFeedback onPress={()=>{
              setSelected(2)
            }}>
              <Image source={imgRefeicao} style={selectedBtn === 2 ? styles.activeImage : styles.noActiveImage}/>
            </TouchableWithoutFeedback>
            <Text>Ocidental</Text>
          </View>
          <View style={styles.containerButtonSelect}>
            <TouchableWithoutFeedback onPress={()=>{
              setSelected(3)
            }}>
              <Image source={imgRefeicao} style={selectedBtn === 3 ? styles.activeImage : styles.noActiveImage} />
            </TouchableWithoutFeedback>
            <Text>Oriental</Text>
          </View>
        </ScrollView>
      </View>
      <Text style={{fontSize: 24, marginLeft: 30, marginTop: 16}}>Opções</Text>
      <FlatList data={atualRestaurantesRequested} renderItem={RenderItems}/>
    </View>
  );
}
export function Explore({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='restaurantesSearchList' component={RestauranteSearchFoods} options={{
            headerTitle: ()=> <Image source={logoGoWaiter} style={{
              width: 99.1,
              height: 42,
            }} 
            resizeMethod={"scale"}
            resizeMode={"contain"}/>
          }}/>
        </Stack.Navigator>
    </View>
  );
}