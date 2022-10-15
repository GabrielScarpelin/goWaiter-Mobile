import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { Home } from './src/Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Explore } from './src/Screens/Explore';
import { Pedidos } from './src/Screens/Pedidos';
import { Profile } from './src/Screens/Profile';
import { HomeIcon, SearchIcon, OrderIcon, ProfileIcon } from './src/components/TabIcons/'
const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor="transparent"/>
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          height: 60
        }
      }}>
        <Tab.Screen component={Home} name='Home' options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({focused, color, size})=> {
            return focused ? <HomeIcon color={color} size={44}/> : <HomeIcon color={color} size={44}/>
          }
        }}/>
        <Tab.Screen component={Explore} name='Search' options={{
          tabBarLabel: 'Pesquisar',
          tabBarIcon: ({focused, color, size})=> {
            return focused ? <SearchIcon color={color} size={44}/> : <SearchIcon color={color} size={44}/>
          }
        }}/>
        <Tab.Screen component={Pedidos} name='Pedidos' options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({focused, color, size})=> {
            return focused ? <OrderIcon color={color} size={44}/> : <OrderIcon color={color} size={44}/>
          }
        }}/>
        <Tab.Screen component={Profile} name='Perfil' options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({focused, color, size})=> {
            return focused ? <ProfileIcon color={color} size={44}/> : <ProfileIcon color={color} size={44}/>
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
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
