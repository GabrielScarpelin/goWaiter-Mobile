import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { Home } from './src/Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Explore } from './src/Screens/Explore';
import { Cart } from './src/Screens/Cart';
import { Profile } from './src/Screens/Profile';
const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor="transparent"/>
      <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
      }}>
        <Tab.Screen component={Home} name='Home' options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size})=> {
            return focused ? <MaterialCommunityIcons color={color} name='home' size={32}/> : <MaterialCommunityIcons color={color} name='home' size={24}/>
          }
        }}/>
        <Tab.Screen component={Explore} name='Search' options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size})=> {
            return (<MaterialCommunityIcons color={color} name='magnify' size={size}/>)
          }
        }}/>
        <Tab.Screen component={Cart} name='Carrinho' options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size})=> {
            return (<MaterialCommunityIcons color={color} name='cart' size={size}/>)
          }
        }}/>
        <Tab.Screen component={Profile} name='Perfil' options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size})=> {
            return (<MaterialCommunityIcons color={color} name='face-man-profile' size={size}/>)
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
