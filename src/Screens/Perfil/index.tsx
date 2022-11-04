import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, ScrollView, TextInput } from 'react-native';
import { HeaderComponent } from '../../components/HeaderComponent';
import imgUser from '../../assets/perfil-cima.png';
import { styles } from './styles';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs';
import myTabParamsList from '../../type';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import logoGoWaiter from '../../assets/logo.png'
import voltarImg from '../../assets/backButton.png'
import closeImg from '../../assets/closeBtn.png'
import { DropQuestion } from '../../components/DropQuestion';
import axios from 'axios';
import { ip } from '../../code/ipMachine';
//TIPAGEM PARA O TYPESCRIPT NAO ACUSAR ERRO (ANY TYPE)
type stackParamListProfile = {
  Home: {
    id: string,
    nome: string,
    uri_foto_usuario: string,
    email: string,
    telefone: string,
    setIsSigned: Function,
  },
  EditProfile: {
    id: string,
    nome: string,
    uri_foto_usuario: string,
    email: string,
    telefone: string
  },
  FAQ: {

  },
  TermosDeUso: {

  },
  AlterarUsuario: {
    id: string
  }
  AlterarEmail: {
    id: string
  }
  AlterarSenha: {
    id: string
  }
  AlterarTelefone: {
    id: string
  }
}


const ProfileStack = createNativeStackNavigator<stackParamListProfile>();


type navEditProfileStackProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'EditProfile'>
  route: RouteProp<stackParamListProfile, 'EditProfile'>
}

type navHomeStackProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'Home'>
  route: RouteProp<stackParamListProfile, 'Home'>
}
type navFaqStackProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'Home'>
}

type navTermosDeUsoProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'TermosDeUso'>
}
type navAlterUserProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'AlterarUsuario'>
  route: RouteProp<stackParamListProfile, 'AlterarUsuario'>
}
type navAlterEmailProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'AlterarEmail'>
  route: RouteProp<stackParamListProfile, 'AlterarEmail'>
}
type navAlterPasswordProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'AlterarSenha'>
  route: RouteProp<stackParamListProfile, 'AlterarSenha'>
}
type navAlterTelefoneProps = {
  navigation: NativeStackNavigationProp<stackParamListProfile, 'AlterarTelefone'>
  route: RouteProp<stackParamListProfile, 'AlterarTelefone'>
}
type navigationProps = {
  navigation: BottomTabNavigationProp <myTabParamsList, 'Perfil'>
  route: RouteProp<myTabParamsList, 'Perfil'>;
}





export function Perfil({ navigation, route }: navigationProps) {
  return (
      <ProfileStack.Navigator screenOptions={{
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
      }} initialRouteName='Home'>
        <ProfileStack.Group>
          <ProfileStack.Screen name='Home' component={HomeProfilePage} initialParams={{
            id: route.params[0].id,
            telefone: route.params[0].telefone,
            email: route.params[0].email,
            nome: route.params[0].nome,
            uri_foto_usuario: route.params[0].uri_foto_usuario,
            setIsSigned: route.params[1].setIsSigned,
          }}/>
          <ProfileStack.Screen name='EditProfile' component={EditProfilePage} initialParams={{
            id: route.params[0].id,
            telefone: route.params[0].telefone,
            email: route.params[0].email,
            nome: route.params[0].nome,
            uri_foto_usuario: route.params[0].uri_foto_usuario
          }}/>
          <ProfileStack.Screen name='FAQ' component={FAQPage}/>
          <ProfileStack.Screen name='TermosDeUso' component={TermosPage}/>
        </ProfileStack.Group>
        <ProfileStack.Group screenOptions={{presentation: 'transparentModal', headerShown: false}}>
          <ProfileStack.Screen name='AlterarUsuario' component={AlterarUsuarioModal}/>
          <ProfileStack.Screen name='AlterarEmail' component={AlterarEmailModal}/>
          <ProfileStack.Screen name='AlterarSenha' component={AlterarSenhaModal}/>
          <ProfileStack.Screen name='AlterarTelefone' component={AlterarTelefoneModal}/>
        </ProfileStack.Group>
      </ProfileStack.Navigator>
  );
}
function HomeProfilePage({ navigation, route }: navHomeStackProps){
  return (
    <View style={{flex: 1, width: '100%', alignItems: 'center', backgroundColor: 'white'}}>
      <TouchableOpacity 
      style={[styles.optionsButton, {marginTop: 64}]}
      onPress={()=>{
        navigation.navigate('EditProfile', {
          id: route.params.id,
          telefone: route.params.telefone,
          email: route.params.email,
          nome: route.params.nome,
          uri_foto_usuario: route.params.uri_foto_usuario})
      }}
      >
        <Text style={{fontSize: 20, color: 'white'}}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton}
      onPress={()=>{
        navigation.navigate('FAQ', {})
      }}
      >
        <Text style={{fontSize: 20, color: 'white'}}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton} onPress={()=>{navigation.navigate('TermosDeUso', {})}}><Text style={{fontSize: 20, color: 'white'}}>Termos de uso</Text></TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton}><Text style={{fontSize: 20, color: 'white'}}>Alterar tema</Text></TouchableOpacity>
      <TouchableOpacity style={styles.optionsButton} onPress={()=> route.params.setIsSigned(false)}><Text style={{fontSize: 20, color: 'white'}}>Sair</Text></TouchableOpacity>
    </View>
  )
}
function EditProfilePage({ navigation, route }: navEditProfileStackProps){
  return (

      <View style={{ display: "flex", alignItems: "center", flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24, alignSelf: 'flex-start'}}><Image source={voltarImg}/></TouchableOpacity>
        <Image
          source={imgUser}
          style={{ width: 400, marginTop: 54 }}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
        <TouchableOpacity>
          <Text style={{ textAlign: "center", marginTop: 6 }}>
            Alterar foto
          </Text>
        </TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity style={styles.optionsButton} onPress={()=> navigation.navigate('AlterarUsuario', {id: route.params.id})}><Text style={{fontSize: 20, color: 'white'}}>Alterar usuário</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton} onPress={()=> navigation.navigate('AlterarEmail', {id: route.params.id})}><Text style={{fontSize: 20, color: 'white'}}>Alterar email</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton} onPress={()=> navigation.navigate('AlterarTelefone', {id: route.params.id})}><Text style={{fontSize: 20, color: 'white'}}>Alterar telefone</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton} onPress={()=> navigation.navigate('AlterarSenha', {id: route.params.id})}><Text style={{fontSize: 20, color: 'white'}}>Alterar senha</Text></TouchableOpacity>
        </View>
      </View>
  );
}
function FAQPage({ navigation }: navFaqStackProps) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24}}><Image source={voltarImg}/></TouchableOpacity>
      <ScrollView horizontal={false}>
        <View style={{alignItems: 'center', paddingBottom: 16, flex: 1}}>
            <DropQuestion pergunta='Como posso criar minha conta?' resposta='Deverá preencher seus dados pessoais assim que fizer a instalação do App, os mesmos são: nome de usuário, email, telefone e senha.'/>
            <DropQuestion pergunta='Posso ter mais de uma conta?' resposta='Acredita-se que não é necessário o uso de duas ou mais contas por pessoa, contudo, não impedimos ninguém de realizar essa ação, pode sim cadastrar mais de uma conta por usuário, levando em consideração que os dados cadastrados devem ser diferentes.'/>
            <DropQuestion pergunta='Esqueci a senha da minha conta, como devo prosseguir?' resposta='Em caso de redefinição de senha, o usuário deve clicar no botão “esqueci minha senha” que fica localizado logo abaixo do campo de senha.'/>
            <DropQuestion pergunta='Como posso reservar meus pedidos?' resposta='Após selecionar seu pedido desejado, clique em “reservar”, o usuário será levado à página de seleção de ingredientes, seleção data/horário e confirmação da reserva. Concluindo-se estes passos, sua reserva será feita e aparecerá na ana “pedidos”.'/>
            <DropQuestion pergunta='Posso cancelar uma reserva?' resposta='Sim. Acredita-se que improvisos acontecem e, consequentemente, acabam prejudicando o usuário em questões de data e horário, portanto, quando algo fora dos seus planos acontecer, o cancelamento da reserva é permitido. Porém, se a ação não for realizada antes da data e horário do pedido, não será possível cancelar o pedido.'/>
            <DropQuestion pergunta='Como posso cadastrar meu comércio?' resposta='Possuimos dois Apps, Go Waiter e Go Waiter para empresas. Caso deseje cadastrar seu comércio em nosso sistema, deverá ser feita a instalação do respectivo App.'/>
        </View>
      </ScrollView>
    </View>
  )
}


function TermosPage ({ navigation }: navTermosDeUsoProps){
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginLeft: 40, marginTop: 24}}><Image source={voltarImg} /></TouchableOpacity>
      <Text>Termos de uso</Text>
    </View>
  )
}

function AlterarUsuarioModal({ navigation, route }: navAlterUserProps){
  const [alteradoComSucesso, setAlteradoComSucesso] = useState(false)
  const [erro, setErroState] = useState(false)
  const [inputName, setInputName] = useState('')

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(200, 200, 200, 0.5)'}} >
      <View style={[{width: 300, height: 250, backgroundColor: '#F0D8D8', alignItems: 'center', paddingTop: 16, borderRadius: 16}, styles.shadowProp]}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={closeImg}
              style={{height: undefined, width: 32, aspectRatio: 500 / 500,}}
              resizeMode={'cover'}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>Alterar nome de usuário</Text>
        <TextInput style={styles.inputText} placeholder="Novo usuário: " onChangeText={(newValue)=> {
          setInputName(newValue)
          }}/>
        <TouchableOpacity style={styles.botaoEntrar}
        onPress={async ()=>{
          const answerServer = await axios.patch(`http://${ip}:3333/userName`, {
            id: route.params.id,
            newUserName: inputName
          })
          const respostaServidorData = answerServer.data
          if (respostaServidorData.sucess){
            setAlteradoComSucesso(true)
            setErroState(false)
          }
          else{
            setAlteradoComSucesso(false)
            setErroState(true)
          }
        }}
        >
          <Text style={{color:'white'}}>Alterar</Text>
        </TouchableOpacity>
        {erro ? <Text>Ops... Deu algum erro!</Text> : null}
        {alteradoComSucesso ? <Text>Alterado com sucesso!</Text> : null }
      </View>
    </View>
  )
}
function AlterarEmailModal({ navigation, route}: navAlterEmailProps){
  const [alteradoComSucesso, setAlteradoComSucesso] = useState(false)
  const [erro, setErroState] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputSenha, setInputSenha] = useState('')
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(200, 200, 200, 0.5)'}} >
      <View style={[{width: 350, height: 300, backgroundColor: '#F0D8D8', alignItems: 'center', paddingTop: 16, borderRadius: 16}, styles.shadowProp]}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={closeImg}
              style={{height: undefined, width: 32, aspectRatio: 500 / 500,}}
              resizeMode={'cover'}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>Alterar email</Text>
        <TextInput style={styles.inputText} placeholder="Novo email: " onChangeText={(newValue)=> {
          setInputEmail(newValue)
          }}/>
        <TextInput style={styles.inputText} placeholder="Confirme sua senha: " secureTextEntry={true} onChangeText={(newValue)=> {
          setInputSenha(newValue)
          }}/>
        <TouchableOpacity style={styles.botaoEntrar}
        onPress={async ()=>{
          const answerServer = await axios.patch(`http://${ip}:3333/userEmail`, {
            id: route.params.id,
            senha: inputSenha,
            newEmail: inputEmail
          })
          const respostaServidorData = answerServer.data
          if (respostaServidorData.sucess){
            setAlteradoComSucesso(true)
            setErroState(false)
          }
          else {
            setAlteradoComSucesso(false)
            setErroState(true)
          }
        }}
        >
          <Text style={{color:'white'}}>Alterar</Text>
        </TouchableOpacity>
        {erro ? <Text>Ops... Deu algum erro!</Text> : null}
        {alteradoComSucesso ? <Text>Alterado com sucesso!</Text> : null }
      </View>
    </View>
  )
}
function AlterarSenhaModal({ navigation, route}: navAlterPasswordProps){
  const [alteradoComSucesso, setAlteradoComSucesso] = useState(false)
  const [erro, setErroState] = useState(false)
  const [inputOldPassword, setInputOldPassword] = useState('')
  const [inputSenha, setInputSenha] = useState('')
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(200, 200, 200, 0.5)'}} >
      <View style={[{width: 350, height: 300, backgroundColor: '#F0D8D8', alignItems: 'center', paddingTop: 16, borderRadius: 16}, styles.shadowProp]}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={closeImg}
              style={{height: undefined, width: 32, aspectRatio: 500 / 500,}}
              resizeMode={'cover'}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>Alterar senha</Text>
        <TextInput style={styles.inputText} placeholder="Insira sua antiga senha: " onChangeText={(newValue)=> {
          setInputOldPassword(newValue)
          }}/>
        <TextInput style={styles.inputText} placeholder="Insira sua nova senha: " secureTextEntry={true} onChangeText={(newValue)=> {
          setInputSenha(newValue)
          }}/>
        <TouchableOpacity style={styles.botaoEntrar}
        onPress={async ()=>{
          const answerServer = await axios.patch(`http://${ip}:3333/userPassword`, {
            id: route.params.id,
            oldPassword: inputOldPassword,
            newPassword: inputSenha
          })
          const respostaServidorData = answerServer.data
          if (respostaServidorData.sucess){
            setAlteradoComSucesso(true)
            setErroState(false)
          }
          else {
            setAlteradoComSucesso(false)
            setErroState(true)
          }
        }}
        >
          <Text style={{color:'white'}}>Alterar</Text>
        </TouchableOpacity>
        {erro ? <Text>Ops... Deu algum erro!</Text> : null}
        {alteradoComSucesso ? <Text>Alterado com sucesso!</Text> : null }
      </View>
    </View>
  )
}
function AlterarTelefoneModal({ navigation, route }: navAlterTelefoneProps){
  const [alteradoComSucesso, setAlteradoComSucesso] = useState(false)
  const [erro, setErroState] = useState(false)
  const [inputNewPhone, setInputNewPhone] = useState('')
  const [inputSenha, setInputSenha] = useState('')
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(200, 200, 200, 0.5)'}} >
      <View style={[{width: 350, height: 300, backgroundColor: '#F0D8D8', alignItems: 'center', paddingTop: 16, borderRadius: 16}, styles.shadowProp]}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={closeImg}
              style={{height: undefined, width: 32, aspectRatio: 500 / 500,}}
              resizeMode={'cover'}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>Alterar telefone</Text>
        <TextInput style={styles.inputText} placeholder="Insira o novo telefone: " onChangeText={(newValue)=> {
          setInputNewPhone(newValue)
          }}/>
        <TextInput style={styles.inputText} placeholder="Confirme sua senha: " secureTextEntry={true} onChangeText={(newValue)=> {
          setInputSenha(newValue)
          }}/>
        <TouchableOpacity style={styles.botaoEntrar}
        onPress={async ()=>{
          let answerServer = await axios.patch(`http://${ip}:3333/userPhone`, {
            id: route.params.id,
            senha: inputSenha,
            newPhone: inputNewPhone
          })
          const respostaServidorData = answerServer.data
          if (respostaServidorData.sucess){
            setAlteradoComSucesso(true)
            setErroState(false)
          }
          else {
            setAlteradoComSucesso(false)
            setErroState(true)
          }
        }}
        >
          <Text style={{color:'white'}}>Alterar</Text>
        </TouchableOpacity>
        {erro ? <Text>Ops... Deu algum erro!</Text> : null}
        {alteradoComSucesso ? <Text>Alterado com sucesso!</Text> : null }
      </View>
    </View>
  )
}