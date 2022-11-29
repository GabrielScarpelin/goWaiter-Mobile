import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar, LogBox } from 'react-native';
import { Home } from './src/Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Explore } from './src/Screens/Explore';
import { Pedidos } from './src/Screens/Pedidos';
import { Perfil } from './src/Screens/Perfil';
import { HomeIcon, SearchIcon, OrderIcon, ProfileIcon, CartIcon } from './src/components/TabIcons/'
import { Login } from './src/Screens/Login';
import myTabParamsList from './src/type'
import { Cart } from './src/Screens/Cart';


const Tab = createBottomTabNavigator<myTabParamsList>()
LogBox.ignoreAllLogs(true)
export default function App() {
  const [isSigned, setIsSigned] = useState(false)
  const [userObject, setUserObject] = useState({id: '', nome: '', uri_foto_usuario: '', email: '', telefone: ''})
  return isSigned ? (
  <NavigationContainer>
    <StatusBar barStyle={"dark-content"} backgroundColor="transparent"/>
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: 'black',
      headerShown: false,
      tabBarStyle: {
        minHeight: 70,
        paddingBottom: 5
      }
    }}>
      <Tab.Screen component={Home} initialParams={userObject} name='Home' options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({focused, color, size})=> {
          return focused ? <HomeIcon color={color} size={44}/> : <HomeIcon color={color} size={44}/>
        },
      }} />
      {/*<Tab.Screen component={Explore} name='Search' initialParams={userObject} options={{
        tabBarLabel: 'Pesquisar',
        tabBarIcon: ({focused, color, size})=> {
          return focused ? <SearchIcon color={color} size={44}/> : <SearchIcon color={color} size={44}/>
        }
      }}/>*/}
      <Tab.Screen component={Cart} name='Cart' initialParams={{id: userObject.id}} options={{
        tabBarLabel: 'Carrinho',
        tabBarIcon: ({focused, color, size})=> {
          return focused ? <CartIcon color={color} size={44}/> : <CartIcon color={color} size={44}/>
        }
      }}/>
      <Tab.Screen component={Pedidos} initialParams={userObject} name='Pedidos' options={{
        tabBarLabel: 'Pedidos',
        tabBarIcon: ({focused, color, size})=> {
          return focused ? <OrderIcon color={color} size={44}/> : <OrderIcon color={color} size={44}/>
        }
      }}/>
      <Tab.Screen component={Perfil} initialParams={ [ userObject, {setIsSigned}] } name='Perfil' options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({focused, color, size})=> {
          return focused ? <ProfileIcon color={color} size={44}/> : <ProfileIcon color={color} size={44}/>
        }
      }}/>
    </Tab.Navigator>
  </NavigationContainer>
  ) : <Login setIsSigned={setIsSigned} setUserObject={setUserObject}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    flex: 1
  }
});
