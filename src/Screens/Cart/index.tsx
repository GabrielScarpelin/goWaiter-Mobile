import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './styles';
import {addOnCart, getCart, deleteOnCart} from '../../code/cartMemoryControl'
import CheckBox from '@react-native-community/checkbox';
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
  useEffect(()=>{
    getCart().then((resposta)=>{
      setCarrinhoData(resposta)
    })
  }, [])
  return (
    <View>
      <FlatList data={carrinhoData} renderItem={renderItemFunc}/>
      <TouchableOpacity>
        <Text>Prosseguir para reserva</Text>
      </TouchableOpacity>
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
        <Stack.Screen component={CartScreen} name="CartHomePage"/>
        <Stack.Screen component={ReservaPage} name="ReservaPage"/>
      </Stack.Navigator>
    </View>
  );
}