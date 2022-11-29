import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { HomeStackParamsList } from '../Home';
import voltarImg from '../../assets/backButton.png'
import setaDireita from '../../assets/setaParaDireita.png'
import CheckBox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler';
import { addOnCart } from '../../code/cartMemoryControl';
type PratoReservaProp = {
  navigation: NativeStackNavigationProp<HomeStackParamsList, 'PratoReserva'>
  route: RouteProp<HomeStackParamsList, 'PratoReserva'>
}
export function PratoReserva({ navigation, route }: PratoReservaProp) {
  const [unidadeCount, setUnidade ] = useState(1)
  const IngredientesParsed = JSON.parse((JSON.parse(route.params.objectPrato.ingredientes).replace('{', '').replace('}', '')))
  const [ removeds, setRemoveds] = useState(new Array(IngredientesParsed.length).fill(false))
  const [ obsText, setObsText] = useState('')
  console.log(route.params.nomeRestaurante)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
      <ScrollView>
        <View style={styles.unidadeContainer}>
          <Text style={styles.unityTextCount}>{unidadeCount}</Text>
          <TouchableOpacity onPress={()=> unidadeCount === 1 ? setUnidade(1) : setUnidade((previousValue)=> previousValue - 1)}><Image source={setaDireita} style={{rotation: 180}}/></TouchableOpacity>
          <Text style={{marginLeft: 8, marginRight: 8}}>Unidades</Text>
          <TouchableOpacity onPress={()=> unidadeCount === 5 ? setUnidade(5) : setUnidade((previousValue)=> previousValue + 1)}><Image source={setaDireita}/></TouchableOpacity>
        </View>
        <Text style={{marginLeft: 42, fontSize: 18, marginTop: 32, fontWeight: '700'}}>Selecione os ingredientes que deseja remover:</Text>
        <View>
          {IngredientesParsed.map( (valor: string, indice: number)=> <View style={styles.alimentosRemovidos} key={valor}>
            <CheckBox style={{borderColor: '#971515', width: 30, height: 30, borderRadius: 8}} color={removeds[indice] ? '#971515' : undefined} value={removeds[indice]} onValueChange={() => {
              const newArray = Array(...removeds)
              newArray[indice] = !newArray[indice]
              setRemoveds(newArray)
            }}/>
            <Text style={{fontWeight: '700', marginLeft: 8}}>{valor}</Text>
          </View>)}
        </View>
        <TextInput style={styles.caixaObservacao} placeholder="Observação: " textAlignVertical='top' multiline onChangeText={(value) => setObsText(value)}/>
        <TouchableOpacity style={styles.botaoReservar} onPress={()=>{
          const itensExcluidos = IngredientesParsed.filter((value: string, indice: number) => removeds[indice] === true)
          addOnCart({
            quantidade: unidadeCount,
            ingredientes_excluidos: itensExcluidos,
            PratoId: route.params.objectPrato.id,
            nomeDoPrato: route.params.objectPrato.nome,
            preco: route.params.objectPrato.preco,
            observacao: obsText,
            nomeRestaurante: route.params.nomeRestaurante,
            idRestaurante: route.params.idRestaurante
          }).then(resposta => {
            navigation.navigate('AdicionadoAoCarrinho', {})
          })
        }}>
          <Text style={{fontSize: 18, color: 'white'}}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}