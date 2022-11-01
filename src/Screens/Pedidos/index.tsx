import React, {useState, useEffect} from 'react'; //ALL IMPORTS NEEDED
import { View, Text, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import axios from 'axios'
import { HeaderComponent } from '../../components/HeaderComponent';
import { RouteProp, NavigationContainer  } from '@react-navigation/native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import myTabParamsList from '../../type'


type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Pedidos'>
  route: RouteProp<myTabParamsList, 'Pedidos'>;
}
type StackRouteProps = {
  PedidosList: {
    num_pedido: string,
    valor_pedido: string,
    ativo: boolean,
    horario_reservado: string,
    'Restaurante.nome': string,
    'Restaurante.endereco': string,
    'Restaurante.uri_foto_restaurante': string,
  },
  openPedido: {

  }
}
interface dataTypesProps {
  "empty": boolean
}
const Stack = createStackNavigator()

/*
const PedidosList = ({ navigation, route }) => (
  <View>
    <Text>Todos os pedidos</Text>
    <FlatList 

    />
  </View>
) 

const abrirPedido = ({ navigation, route }) => (
  <View>
    
  </View>
)
*/
export function Pedidos({ navigation, route }: navigationProps) {
  const [dataPedidos, setDataPedidos] = useState([{}]);
  useEffect(()=>{
    setDataPedidos([]);
    axios
      .get(`http://192.168.10.106:3333/pedidos?id=${route.params.id}`)
      .then((resposta) => {
        const respostaData = resposta.data;
        if (respostaData.length > 0) {
          setDataPedidos(respostaData);
        }
        else {
          setDataPedidos(['empty'])
        }
      });
  }, [])
  return dataPedidos.length > 0 ? dataPedidos.includes('empty') ? (
    <View>
      <Text>Não há nada por aqui!</Text>
    </View>
  ) : (
    <View>
      <Text>Carregar pedidos</Text>
    </View>
  ) : (
  <View style={styles.activityIndicator}>
    <ActivityIndicator size={"large"} color={"#971515"}/>
  </View>
  ) 
}