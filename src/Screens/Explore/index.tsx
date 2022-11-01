import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import { RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import myTabParamsList from '../../type'
import { PratoReserva } from '../PratoReserva';
import { RestauranteScreen } from '../RestauranteScreen';
import axios from 'axios';

const Stack = createNativeStackNavigator()
type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Search'>
  route: RouteProp<myTabParamsList, 'Search'>;
}
const RestauranteSearchFoods = ()=>{
  useEffect(()=>{
    axios.get('http://192.168.10.106:3333/restaurantes/-23.6830495,-46.6625742')
      .then(restaurantesList => console.log(restaurantesList.data))
  }, [])
  return (
    <View>

    </View>
  )
}
export function Explore({ navigation, route }: navigationProps) {
  return (
    <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='restaurantesSearchList' component={RestauranteSearchFoods}/>
          <Stack.Screen name='restauranteScreen' component={RestauranteScreen}/>
          <Stack.Screen name='pratoScreen' component={PratoReserva}/>
        </Stack.Navigator>
    </View>
  );
}