import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './styles';
import {addOnCart, getCart, deleteOnCart} from '../../code/cartMemoryControl'
import CheckBox from '@react-native-community/checkbox';
import emptyPedidosImg from '../../assets/messagetext1.png'
import logoGoWaiter from '../../assets/logo.png'

const Stack = createNativeStackNavigator()
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
const CartScreen = ()=>{
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
        <TouchableOpacity style={[styles.botaoReservar, {marginRight: 32}]}>
          <Text style={{color: 'white', fontSize: 24}}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
type reservaProps = {
  navigation: {
    navigate: Function,
    goBack: Function
  }
}
const ReservaPage = ({navigation}: reservaProps)=>{
  return (
    <View>
      <Text>Reserva screen</Text>
    </View>
  )
}


export function Cart() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen component={CartScreen} name="CartHomePage" options={{
            headerTitle: ()=> <Image source={logoGoWaiter} style={{
              width: 99.1,
              height: 42,
            }} 
            resizeMethod={"scale"}
            resizeMode={"contain"}/>
          }}/>
        <Stack.Screen component={ReservaPage} name="ReservaPage"/>
      </Stack.Navigator>
    </View>
  );
}