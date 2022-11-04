import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid, TouchableWithoutFeedback } from 'react-native';
import imgLocation from '../../assets/location.png'
import imgDesconto from '../../assets/desconto.png'
import imgLike from '../../assets/like1.png'
import { HeaderComponent } from '../../components/HeaderComponent'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import logoGoWaiter from '../../assets/logo.png'
import myTabParamsList from '../../type'
import getLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import { getCart } from '../../code/cartMemoryControl';
import axios from 'axios';
import { ip } from '../../code/ipMachine'
import { FlatList } from 'react-native-gesture-handler';
import { RestauranteScreen }  from '../RestauranteScreen'
import voltarImg from '../../assets/backButton.png'
import { PratoScreen } from '../PratoScreen';

type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Home'>
  route: RouteProp<myTabParamsList, 'Home'>;
}
export type HomeStackParamsList = {
  InitialPage: {
    id: string,
  },
  SortedPage: {
    id: string,
    sortBy: 'price' | 'next' | 'avaliacao'
  },
  RestaurantePage: {
    idUser: string,
    idRestaurante: string,
    nomeRestaurante: string
  },
  PratoScreen: {
    idUser: string,
    id: string,
  }

}
type InitialPageProps = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'InitialPage'>
  route: RouteProp<HomeStackParamsList, 'InitialPage'>
}
type RestaurantesPageProps = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'SortedPage'>
  route: RouteProp<HomeStackParamsList, 'SortedPage'>
}
const dataTeste = [{
    "distance": 1.0099042251550383,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "379c23fa-fe1a-45e0-938a-9f07190bd572",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665708222268-Centro-CEAP.png",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d823215131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d343215131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d8456415131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d823435131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 0.98563,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d825435131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d821235131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d826785131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  },{
    "distance": 1.02,
    "endereco": "Rua Jose Vieira Martins, 270",
    "id": "3a182ae5-c6b4-48b0-8a77-d823789131b6",
    "nome": "CEAP Alimentação",
    "uri_foto_restaurante": "./upload/restaurantes/1665777381704-download.jpg",
    "categoria_principal" : 'Doces'
  }
] 
const HomeStack = createNativeStackNavigator<HomeStackParamsList>()
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Permitir acesso à localização",
        message:
          "Precisamos do acesso à sua localização\n" +
          "Assim, filtraremos os restaurantes mais próximos",
        buttonNegative: "Negar",
        buttonPositive: "Permitir"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Acesso à localização concedido");
    } else {
      console.log("Acesso à localização negado");
    }
  } catch (err) {
    console.warn(err);
  }
};

const checkLocationPermission = async ()=> {
  const checkLocationAcess = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  console.log(checkLocationAcess)
  return checkLocationAcess;
}
const InitialPage = ({ navigation, route }: InitialPageProps) => {
  console.log(route.params)
  return (
    <View style={styles.viewButton}>
      <TouchableOpacity style={styles.containerButton} onPress={()=>{
        requestLocationPermission()
        navigation.navigate('SortedPage', {
          id: route.params.id,
          sortBy: 'next'
        })
      }}>
        <View>
          <Text style={styles.textTitle}>Proximos à mim</Text>
        </View>
        <Image
          source={imgLocation}
          resizeMethod={"scale"}
          resizeMode={"contain"}
          style={styles.imgFigure}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerButton} onPress={()=>{
        navigation.navigate('SortedPage', {
          id: route.params.id,
          sortBy: 'avaliacao'
        })
      }}>
        <Text style={styles.textTitle}>Melhores avaliados</Text>
        <Image
          source={imgLike}
          resizeMethod={"scale"}
          resizeMode={"cover"}
          style={styles.imgFigure}
        />
      </TouchableOpacity>
    </View>
  );
}



function RestaurantesListScreen({ navigation, route }: RestaurantesPageProps){
  const [restaurantes, setRestaurantes ] = useState([])
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
      <View style={{width: 140, marginLeft: '10%', marginBottom: 16}}>
        <TouchableWithoutFeedback onPress={()=>{
          navigation.navigate('RestaurantePage', {idUser: route.params.id, idRestaurante: item.id, nomeRestaurante: item.nome})
        }}>
          <View>
            <View style={{width: 120, height: 120, borderRadius: 30, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
              <Text>FOTO</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>{item.nome}</Text>
            <Text>{item.endereco}</Text>
            <Text>{item.categoria_principal}</Text>
            <Text>{item.distance >= 1 ? `${item.distance.toFixed(2)}Km` : `${(item.distance*1000).toFixed(0)}m`} de você</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  useEffect(()=>{
    requestLocationPermission()
      Geolocation.getCurrentPosition((location)=>{
        const [latitude, longitude] = [location.coords.latitude, location.coords.longitude]
        console.log(latitude, longitude)
        axios.get(`http://${ip}:3333/restaurantes/${latitude},${longitude}?max=10`).then((resposta)=>{
        setRestaurantes(resposta.data)
        })
      }, (erro)=> {
        console.log(erro)
      }, {
        enableHighAccuracy: true
      })
  }, [])
  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
      <FlatList data={dataTeste} renderItem={RenderItems} numColumns={2} keyExtractor={(item, index ) => item.id} style={{width: '100%', marginTop: 32}}/>
    </View>
  )
}
export function Home({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
        <HomeStack.Navigator screenOptions={{
        animation: 'slide_from_bottom',
        headerTitle: ()=> (<Image source={logoGoWaiter} style={{
          width: 120,
          height: undefined,
          marginLeft: 30,
          aspectRatio: 991 / 417
        }} 
        resizeMode={"cover"}/>
        ),
        headerShadowVisible: false,
        headerBackVisible: false
      }}>
          <HomeStack.Screen name='InitialPage' component={InitialPage} initialParams={{id: route.params.id}}/>
          <HomeStack.Screen name='SortedPage' component={RestaurantesListScreen} initialParams={{id: route.params.id, sortBy: 'avaliacao'}}/>
          <HomeStack.Screen name='RestaurantePage' component={RestauranteScreen} initialParams={{idUser: route.params.id, idRestaurante: ''}}/>
          <HomeStack.Screen name='PratoScreen' component={PratoScreen} initialParams={{idUser: route.params.id}}/>
        </HomeStack.Navigator>
    </View>
  );
}

