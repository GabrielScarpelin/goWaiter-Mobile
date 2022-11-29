import React, {useState, useEffect} from 'react'; //ALL IMPORTS NEEDED
import { View, Text, FlatList, ActivityIndicator, ListRenderItem, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { HeaderComponent } from '../../components/HeaderComponent';
import { RouteProp, NavigationContainer, Route  } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { styles } from './styles';
import myTabParamsList from '../../type'
import { ip } from '../../code/ipMachine'
import emptyPedidosImg from '../../assets/messagetext1.png'
import logoGoWaiter from '../../assets/logo.png'
import voltarImg from '../../assets/backButton.png'

type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Pedidos'>
  route: RouteProp<myTabParamsList, 'Pedidos'>;
}
type StackRouteProps = {
  PedidosList: {
    id: string
  },
  DetalhePedido: {
    idPedido: string
  },
  erroModal: {

  },
  confirmacaoExclusao: {
    idPedido: string
  }
}
type PedidosNavProps = {
  navigation: NativeStackNavigationProp <StackRouteProps, 'PedidosList'>,
  route: RouteProp <StackRouteProps, 'PedidosList'>
}
type openPedidoNavProps = {
  navigation: NativeStackNavigationProp <StackRouteProps, 'DetalhePedido'>,
  route: RouteProp <StackRouteProps, 'DetalhePedido'>
}
interface dataTypesProps {
  "empty": boolean
}


const PedidosList = ({ navigation, route }:PedidosNavProps) => {
  const [dataPedidos, setDataPedidos] = useState<any[]>([]);
  useEffect(()=>{
    setDataPedidos([]);
    navigation.addListener('focus', ()=>{
      axios
      .get(`http://${ip}:3333/pedidos?id=${route.params.id}`)
      .then((resposta) => {
        const respostaData = resposta.data;
        console.log(respostaData)
        if (respostaData.length > 0) {
          setDataPedidos(respostaData);
        }
        else {
          setDataPedidos(['empty'])
        }
      });
    })
  }, [])
  return dataPedidos.length > 0 ? dataPedidos.includes('empty') ? (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <Image source={emptyPedidosImg}/>
      <Text style={{fontSize: 20}}>Ainda não há pedidos por aqui!</Text>
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList data={dataPedidos} renderItem={({ item }: {
        item: {
          num_pedido: string,
          valor_pedido: number,
          data_reservada: string,
          horario_reservado: string,
          observacao: string,
          ativo: boolean,
          Restaurante: {
            nome: string,
            endereco: string
          }
        }
      }) => {
        console.log('renderizando')
        return (
            <View style={styles.ItemContainer}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  borderColor: "black",
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 24,
                }}
              >
                <Text>FOTO</Text>
              </View>
              <View style={{ marginLeft: 24, maxWidth: "70%" }}>
                {item.ativo ? (
                  <Text style={{fontSize: 20, color: "#048245"}}>
                    Ativo
                  </Text>
                ) : (
                  <Text style={{fontSize: 20, color: "#971515"}}>Inativo</Text>
                )}
                <Text style={{ fontWeight: "600" , marginTop: 8}}>
                  Restaurante: <Text>{item.Restaurante.nome}</Text>
                </Text>
                <Text style={{ fontWeight: "600", marginTop: 8 }}>
                  Endereço restaurante: <Text>{item.Restaurante.endereco}</Text>
                </Text>
                <Text style={{ fontWeight: "600", marginTop: 8 }}>
                  Valor do pedido: R${item.valor_pedido.toFixed(2)}
                </Text>
                <Text style={{ fontWeight: "600", marginTop: 8 }}>
                  Data reservada: {item.data_reservada.split('-').reverse().join('/')}
                </Text>
                <Text style={{ fontWeight: "600", marginTop: 8 }}>
                  Hora reservada: {item.horario_reservado.split(':').slice(0, 2).join(':')}
                </Text>
                <Text style={{ fontWeight: "600" }}>
                  Observação: {item.observacao}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <TouchableOpacity onPress={()=>{
                      navigation.navigate('DetalhePedido', {
                        idPedido: item.num_pedido
                      })
                    }}>
                      <Text style={{ fontWeight: "600" , color: '#545252', textDecorationLine: 'underline'}}>
                        Detalhes do pedido
                      </Text>
                    </TouchableOpacity>
                    {item.ativo ? (
                      <TouchableOpacity style={{marginLeft: 16}} onPress={()=>{
                        const data = new Date()
                        const [dia, mes, ano] = item.data_reservada.split('-').reverse()
                        const [hora, minutos] = item.horario_reservado.split(':').slice(0, 2)
                        if (parseInt(dia) == data.getDay() && parseInt(mes) == data.getMonth() + 1 && parseInt(ano) == data.getFullYear() && (parseInt(hora) * 60 + parseInt(minutos)) - (data.getHours() * 60 + data.getMinutes()) < 10){
                          navigation.navigate('erroModal', {})
                        }
                        else {
                          navigation.navigate('confirmacaoExclusao', {
                            idPedido: item.num_pedido
                          })
                        }
                      }}>
                        <Text style={{ fontWeight: "600" , color: '#971515', textDecorationLine: 'underline'}}>
                          Cancelar pedido
                        </Text>
                      </TouchableOpacity>
                    ): null}                    
                </View>
              </View>
            </View>
        );
      }} />
    </View>
  ) : (
  <View style={styles.activityIndicator}>
    <ActivityIndicator size={"large"} color={"#971515"}/>
  </View>
  ) 
}

const AbrirPedido = ({ navigation, route }: openPedidoNavProps) => {
  const [PratosPedidos, setPratosPedidos] = useState([])
  console.log(route.params.idPedido)
  useEffect(()=>{
    axios
      .get(`http://${ip}:3333/detailPedido?id=${route.params.idPedido}`)
      .then((resposta) => {
        const respostaData = resposta.data;
        console.log(respostaData)
        if (respostaData.length > 0) {
          setPratosPedidos(respostaData);
        }
      });
  }, [])
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
  </View>
)}
const ErroAoExcluir = ()=> (
  <View>

  </View>
)
type ConfirmarExclusaoProps = {
  navigation: NativeStackNavigationProp<StackRouteProps, 'confirmacaoExclusao'>
  route: RouteProp<StackRouteProps, 'confirmacaoExclusao'>
}
const ConfirmaModal = ({ navigation, route }: ConfirmarExclusaoProps)=> (
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <View style={{width: 220, height: 170, backgroundColor: '#971515', borderRadius: 24, paddingHorizontal: 10}}>
      <Text style={{fontWeight: '500', color: 'white', marginTop: 20, textAlign: 'center', fontSize: 16}}>
      Tem certeza que deseja cancelar seu pedido?
      </Text>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 60}}>
        <TouchableOpacity style={{paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#FFFFFF', borderRadius: 25, borderWidth: 2, borderColor: '#B73D3D', marginRight: 20}} onPress={()=>{
          axios.delete(`http://${ip}:3333/cancelarPedido`, {
            data: {
              idPedido: route.params.idPedido
            }
          }).then((respostaAxios) => {
            if (respostaAxios.data.sucess){
              navigation.goBack()
            }
          })
        }}>
          <Text style={{color: '#971515'}}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingHorizontal: 16, paddingVertical: 6, backgroundColor: '#B73D3D', borderRadius: 25, borderWidth: 2, borderColor: '#FFFFFF'}}>
          <Text style={{color: '#FFFFFF'}}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)
const PedidoStackNavigator = createNativeStackNavigator<StackRouteProps>()
export function Pedidos({ navigation, route }: navigationProps) {
  return (
      <PedidoStackNavigator.Navigator initialRouteName='PedidosList' screenOptions={{
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
        <PedidoStackNavigator.Screen name='PedidosList' component={PedidosList} initialParams={{
          id: route.params.id
        }}/>
        <PedidoStackNavigator.Screen name='DetalhePedido' component={AbrirPedido}/>
        <PedidoStackNavigator.Group screenOptions={{presentation: 'transparentModal'}}>
          <PedidoStackNavigator.Screen name='erroModal' component={ErroAoExcluir}/>
          <PedidoStackNavigator.Screen name='confirmacaoExclusao' component={ConfirmaModal}/>
        </PedidoStackNavigator.Group>
      </PedidoStackNavigator.Navigator>
  )
}