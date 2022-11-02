import React from 'react';
import { View, Text, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import imgLocation from '../../assets/location.png'
import imgDesconto from '../../assets/desconto.png'
import imgLike from '../../assets/like1.png'
import { HeaderComponent } from '../../components/HeaderComponent'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp, NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import logoGoWaiter from '../../assets/logo.png'
import myTabParamsList from '../../type'
import getLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import { getCart } from '../../code/cartMemoryControl';

type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Home'>
  route: RouteProp<myTabParamsList, 'Home'>;
}
const Stack = createNativeStackNavigator()
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
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
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
const InitialPage = () => {
  return (
    <View style={styles.viewButton}>
      <TouchableOpacity style={styles.containerButton}>
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
      <TouchableOpacity style={styles.containerButton}>
        <Text style={styles.textTitle}>Custo benefício</Text>
        <Image
          source={imgDesconto}
          resizeMethod={"scale"}
          resizeMode={"contain"}
          style={styles.imgFigure}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerButton}>
        <Text style={styles.textTitle}>Melhores avaliados</Text>
        <Image
          source={imgLike}
          resizeMethod={"scale"}
          resizeMode={"contain"}
          style={styles.imgFigure}
        />
      </TouchableOpacity>
    </View>
  );
}
export function Home({ navigation, route }: navigationProps) {
  if (!checkLocationPermission()){
    requestLocationPermission()
  }
  return (
    <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='InitialPage' component={InitialPage} options={{
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