import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import {addOnCart, getCart, deleteOnCart} from '../../code/cartMemoryControl'
import CheckBox from '@react-native-community/checkbox';
import emptyPedidosImg from '../../assets/messagetext1.png'
import logoGoWaiter from '../../assets/logo.png'
import voltarImg from '../../assets/backButton.png'
import DatePicker from 'react-native-date-picker'

type CartStackProps = {
  CartHomePage: {

  },
  ReservaPage: {
    itensSelected: [...any]
  }
}
type ReservaPageProps = {
  navigation: NativeStackNavigationProp<CartStackProps, 'ReservaPage'>,
  route: RouteProp<CartStackProps, 'ReservaPage'>
}
type CartScreenPage = {
  navigation: NativeStackNavigationProp<CartStackProps, 'CartHomePage'>,
  route: RouteProp<CartStackProps, 'CartHomePage'>
}

const CartStack = createNativeStackNavigator<CartStackProps>()
const renderItemFunc = (item: object)=>{
  return (
    <View>
      <View>
        <CheckBox />
      </View>
      <View>
        <Image source={{uri: ''}}/>
        <View>
          <Text>
            Title
          </Text>
          <Text>Data e hora</Text>
          <Text>Ingredientes retirados: </Text>
        </View>
      </View>
      
    </View>
  )
}
const CartScreen = ({ navigation }: CartScreenPage)=>{
  const [carrinhoData, setCarrinhoData] = useState([])
  const [totalCartValue, setTotalCartValue] = useState(0)
  useEffect(()=>{
    getCart().then((resposta)=>{
      setCarrinhoData(resposta)
    })
  }, [])
  return (
    <View style={{flex: 1}}>
      {carrinhoData.length > 0 ? <View style={styles.containerWithFlat}><FlatList data={carrinhoData} renderItem={renderItemFunc}/></View> : (<View style={styles.containerWithoutFlat}><Image source={emptyPedidosImg}/><Text style={{fontSize: 18}}>Carrinho vazio! Que tal uma fazer uma reserva?</Text></View>)}
      <View style={styles.footerReserva}>
        <View style={{marginLeft: 32}}>
          <Text style={{fontSize: 20}}>Total:</Text>
          <Text style={{fontSize: 20}}>R${totalCartValue.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={[styles.botaoReservar, {marginRight: 32}]} onPress={()=>{
          navigation.navigate('ReservaPage', {
            itensSelected: [0, 1, 3]
          })
        }}>
          <Text style={{color: 'white', fontSize: 24}}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const ReservaPage = ({ navigation, route }: ReservaPageProps)=>{
  console.log(route.params.itensSelected)
  const [date, setDate] = useState(new Date())
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24}}><Image source={voltarImg}/></TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text>Data da reserva</Text>
        <DatePicker date={date} onDateChange={setDate} />
      </View>
    </View>
  )
}


export function Cart() {
  return (
    <View style={styles.container}>
      <CartStack.Navigator screenOptions={{
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
        <CartStack.Screen component={CartScreen} name="CartHomePage"/>
        <CartStack.Screen component={ReservaPage} name="ReservaPage"/>
      </CartStack.Navigator>
    </View>
  );
}