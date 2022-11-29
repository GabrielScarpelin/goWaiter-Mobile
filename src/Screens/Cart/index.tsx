import React, { useEffect, useState } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import {addOnCart, getCart, deleteOnCart, cleanCarrinho} from '../../code/cartMemoryControl'
import CheckBox from 'expo-checkbox';
import emptyPedidosImg from '../../assets/messagetext1.png'
import logoGoWaiter from '../../assets/logo.png'
import voltarImg from '../../assets/backButton.png'
import closeImg from '../../assets/verifyBtn.png'
import DatePicker from 'react-native-date-picker'
import '../../prototype/string.extensions'
import SelectDropdown from 'react-native-select-dropdown'
import lixeiraIcon from '../../assets/lixeira.png'
import { A } from '@expo/html-elements';
import { ip } from '../../code/ipMachine'
import { ReservaConfirmadaScreen } from '../ReservaConfirmadaScreen';
import myTabParamsList from '../../type';
import axios from 'axios';
type CartStackProps = {
  CartHomePage: {
    idUser: string
  },
  ReservaPage: {
    itensSelected: [...any],
    idUser: string,
    totalPrice: number
  },
  ReservaConfirmada: {
  },
  ErroOnCart: {
    erroMsg: string
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

const CartScreen = ({ navigation, route }: CartScreenPage)=>{
  const [carrinhoData, setCarrinhoData] = useState([])
  const [totalCartValue, setTotalCartValue] = useState(0)
  const [ selectedItems, setSelected] = useState(new Array(carrinhoData.length))
  const renderItemFunc = ({ item, index }: {
    item: {
    PratoId: string,
    nomeDoPrato: string,
    preco: number,
    quantidade: number,
    ingredientes_excluidos: [],
    nomeRestaurante: string,
    idRestaurante: string
    },
    index: number
  })=>{
    return (
      <View style={styles.carrinhoItemContainer}>
        <View>
          <CheckBox value={selectedItems[index]} onValueChange={()=>{
            const newSelected = selectedItems
            newSelected[index] = !newSelected[index]
            if (newSelected[index]){
              setTotalCartValue(( valor )=> valor + (item.preco * item.quantidade))
            }
            else {
              setTotalCartValue(( valor )=> valor - (item.preco * item.quantidade))
            }
            setSelected(newSelected)
          }} color={selectedItems[index] ? '#971515' : undefined}/>
        </View>
        <View style={{width: 100, height: 100, borderRadius: 8, borderColor: 'black', borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginLeft: 24}}>
          <Text>FOTO</Text>
        </View>
        <View style={{marginLeft: 24, maxWidth: '50%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {item.nomeDoPrato}
            </Text>
            <Text style={{fontWeight: '600'}}>Ingredientes retirados: {item.ingredientes_excluidos.toString()}</Text>
            <Text style={{fontWeight: '600'}}>Restaurante: <Text>{item.nomeRestaurante}</Text></Text>
              <Text style={{fontWeight: '600'}}>Quantidade: {item.quantidade}</Text>
        </View>
        <View style={{marginLeft: 32}}>
          <TouchableOpacity onPress={()=>{
            deleteOnCart(index).then((newCarrinho)=> setCarrinhoData(newCarrinho))
          }}>
            <Image source={lixeiraIcon} resizeMode="cover" style={{width: 40, height: undefined, aspectRatio: 1}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  useEffect(()=>{
    navigation.addListener('focus', ()=> {
      getCart().then((resposta)=>{
        setCarrinhoData(resposta)
        setSelected(new Array(carrinhoData.length).fill(false))
        setTotalCartValue(0)
      })
    })
  }, [])
  return (
    <View style={{flex: 1}}>
      {carrinhoData.length > 0 ? <View style={styles.containerWithFlat}><FlatList data={carrinhoData} renderItem={renderItemFunc}/></View> : (<View style={styles.containerWithoutFlat}><Image source={emptyPedidosImg}/><Text style={{fontSize: 18}}>Carrinho vazio! Que tal uma fazer uma reserva?</Text></View>)}
      <View style={styles.footerReserva}>
        <View style={{marginLeft: 32}}>
          <Text style={{fontSize: 20}}>Total:</Text>
          <Text style={{fontSize: 20}}>R${(totalCartValue.toFixed(2).toString()).replace('.', ',')}</Text>
        </View>
        <TouchableOpacity style={[styles.botaoReservar, {marginRight: 32}]} onPress={()=>{
          const filtredItems = carrinhoData.filter((valor, indexParam) => selectedItems[indexParam])
          const IDs = filtredItems.map((valor: any)=> {
            return valor.idRestaurante
          })
          if (filtredItems.length == 0){
            navigation.navigate('ErroOnCart', {
              erroMsg: 'Precisa selecionar ao menos um item'
            })
          }
          else {
            if (IDs.every(( value ) => value === IDs[0])){
              navigation.navigate('ReservaPage', {
                itensSelected: filtredItems,
                idUser: route.params.idUser,
                totalPrice: totalCartValue
            })}
            else {
              navigation.navigate('ErroOnCart', {
                erroMsg: 'Os itens selecionados devem ser do mesmo restaurante'
              })
            }
          }
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
  const [time, setTime] = useState(new Date())
  const [termos, setTermos] = useState(false)
  const [valido, setValido ] = useState(true)
  const [observacao, setObservacao] = useState('')
  const [erroHorarioEscolhido, setErroHorario ] = useState(false)
  useEffect(()=>{
    const forUpTime = Math.ceil(time.getMinutes() / 10)
  }, [])
  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24}}><Image source={voltarImg}/></TouchableOpacity>
      <View style={styles.reservaDateContainer}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Data da reserva: </Text>
        <TouchableOpacity style={styles.botaoPegarData} onPress={()=> setOpenDate(true)}><Text style={{fontSize: 18, fontWeight: '600', lineHeight: 22, letterSpacing: 2}}>{date.getDate().colocarZeroAntes()}/{(date.getMonth() + 1).colocarZeroAntes()}/{date.getFullYear()}</Text></TouchableOpacity>
        <DatePicker date={date} modal open={openDate} is24hourSource={'device'} mode={'date'} minimumDate={new Date()} onConfirm={(date)=> {
          setOpenDate(false)
          setDate(date)
          }} onCancel={()=>{
            setOpenDate(false)
          }} locale={'pt'}/>
      </View>
      <View style={styles.reservaDateContainer}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Horário da reserva: </Text>
        <TouchableOpacity style={styles.botaoPegarData} onPress={()=> setOpenTime(true)}><Text style={{fontSize: 18, fontWeight: '600', lineHeight: 22, letterSpacing: 2}}>{time.getHours().colocarZeroAntes()}:{time.getMinutes().colocarZeroAntes()}</Text></TouchableOpacity>
        <DatePicker date={time} modal open={openTime} is24hourSource={'device'} mode={'time'} minuteInterval={10} onConfirm={(Newtime)=> {
          setOpenTime(false)
          setTime(Newtime)
          if (date.getDate() === new Date().getDate() && Newtime.getHours() <= new Date().getHours() && Newtime.getMinutes() <= new Date().getMinutes()){
            console.log('erro')
            setValido(false)
            setErroHorario(true)
          } 
          else {
            setValido(true)
            setErroHorario(false)
          }
          }} onCancel={()=>{
            setOpenTime(false)
          }} locale={'pt'}/>
      </View>
      <View>
        {erroHorarioEscolhido ? <Text style={{marginLeft: 52, color: '#971515', fontSize: 18}}>Horário deve ser mais tarde</Text>: null}
      </View>
      <View style={styles.reservaDateContainer}>
        <Text style={{fontSize: 20, fontWeight: '600', marginRight: 12}}>Quantidade de pessoas: </Text>
        <SelectDropdown defaultValue={1} data={[1, 2, 3, 4, 5, 6]} rowTextForSelection={( item )=> item} buttonTextAfterSelection={(selectedItem) => selectedItem} buttonStyle={{width: '15%', marginLeft: 12, borderColor: '#971515', borderWidth: 2, borderRadius: 6, backgroundColor: 'white'}} onSelect={(selectedItem) => console.log(selectedItem)}/>
      </View>
      <View style={[styles.reservaDateContainer, {alignItems: 'center', width: '100%'}]}>
        <TextInput style={styles.caixaObservacao} placeholder="Observação: " textAlignVertical='top' multiline onChangeText={(text)=> setObservacao(text)}/>
      </View>
      <View style={{alignItems: 'center', width: '100%', flexDirection: 'row', marginLeft: 52, marginTop: 32}}>
        <CheckBox color={termos ? '#971515' : undefined } value={termos} onValueChange={(newValue) => setTermos(newValue)}/>
        <Text style={{marginLeft: 12, fontSize: 20}}>Aceitar os <A href={`http://${ip}:3333/termosDeUso`}><Text style={{color: '#971515'}}>termos</Text></A> da reserva</Text>
      </View>
      <View style={{alignItems: 'center', width: '100%', flexDirection: 'row', marginTop: 32, justifyContent: 'center'}}>
        <TouchableOpacity style={styles.botaoReservar}
        onPress={()=>{      
          if (valido){
            axios.post(`http://${ip}:3333/cadastrarReserva`, {
                idUser: route.params.idUser,
                pratos: route.params.itensSelected,
                paramsReserva: {
                    horario: `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:00`,
                    data: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                    observacao,
                    valor: route.params.totalPrice
                }
            }).then((axiosResposta) => {
              if (axiosResposta.data.success){
                navigation.navigate('ReservaConfirmada', {})
              }
            })

          }
        }}
        >
          <Text style={{color: 'white', fontSize: 18}}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
type TabCartScreenProps = {
  navigation: NativeStackNavigationProp<myTabParamsList, 'Cart'>,
  route: RouteProp<myTabParamsList, 'Cart'>
}
type ErroScreenProps = {
  navigation: NativeStackNavigationProp<CartStackProps, 'ErroOnCart'>
  route: RouteProp<CartStackProps, 'ErroOnCart'>
}
function ErroCarrinho({ navigation, route }: ErroScreenProps){
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)'}} onTouchStart={()=>{
      navigation.goBack()
    }} >
      <View style={[{width: 250, height: 160, backgroundColor: '#F0D8D8', alignItems: 'center', paddingTop: 16, borderRadius: 16, justifyContent: 'center'}, styles.shadowProp]}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16, alignSelf: 'center', textAlign: 'center'}}>{route.params.erroMsg}</Text>
      </View>
    </View>
  )
}

export function Cart({ navigation, route }: TabCartScreenProps) {
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
        <CartStack.Screen component={CartScreen} name="CartHomePage" initialParams={{idUser: route.params.id}}/>
        <CartStack.Screen component={ReservaPage} name="ReservaPage" initialParams={{idUser: route.params.id}}/>
        <CartStack.Screen component={ReservaConfirmadaScreen} name="ReservaConfirmada"/>
        <CartStack.Group screenOptions={{presentation: 'transparentModal'}}>
          <CartStack.Screen component={ErroCarrinho} name='ErroOnCart'/>
        </CartStack.Group>
      </CartStack.Navigator>
    </View>
  );
}