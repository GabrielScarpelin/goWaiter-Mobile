import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/logoCorInvertida.png'
import fritaBackground from '../../assets/fritasBackground.png'
import erroIcon from '../../assets/botao-x.png'
import { styles } from './styles';
import axios from 'axios'

interface LoginProps{
    setIsSigned: Function,
    setUserObject: Function
}


export function Login(props: LoginProps) {
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [erroLogin, setErroLogin] = useState(false)
  return (
    <View style={styles.container}>
        <View style={{width: '125%', height: 650, backgroundColor: '#971515', borderRadius: 325, position: 'absolute', top: -325, left: '-12.5%'}} />
        <Image 
            source={logo} 
            style={{marginTop: 60, marginBottom: 40, width: 300, height: 150}}
            resizeMethod={"scale"}
            resizeMode={'contain'}
        />
        <View style={styles.containerCentral}>
            <View style={styles.containerButtons}>
                <Text>Fazer login</Text>
            </View>
            {erroLogin ? <ErroLoginMsg /> : null}
            <TextInput placeholder='Email:' style={styles.inputText} onChangeText={newEmailText => {
                setEmailText(newEmailText)
                setErroLogin(false)
            }}/>
            <TextInput placeholder='Senha:' style={[styles.inputText, {marginTop: 12}]} secureTextEntry={true} onChangeText={newPasswordText => {
                setPasswordText(newPasswordText)
                setErroLogin(false)
            }}/>
            <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 16, marginTop: 10}}>
                <Text style={{color: '#7A7272', textDecorationLine: 'underline'}}>Redefinir senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoEntrar} onPress={async ()=>{
                const response = axios.post('http://192.168.10.106:3333/signin', {
                    email: emailText,
                    senha: passwordText
                }).then(response => {
                    const resposta = response.data
                    if (resposta.logged){
                        props.setUserObject(resposta.user)
                        props.setIsSigned(true)
                    }
                    else {
                        setErroLogin(true)
                    }
                })     
            }}>
                <Text style={{color: 'white'}}>Entrar</Text>
            </TouchableOpacity>
        </View>
        <Image 
            source={fritaBackground} 
            style={{position: 'absolute', left: 0, bottom: 0, height: undefined, width: '50%', aspectRatio: 295 / 340}}
            resizeMode={'cover'}
        />
    </View>
  );
}

function ErroLoginMsg(){
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 16, marginBottom: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={erroIcon}
                    style={{height: undefined, width: 16, aspectRatio: 512 / 512}}
                    resizeMode={'cover'}
                />
                <Text style={{color: '#971515', marginLeft: 8}}>Ops... Tem algo de errado aí!</Text>
        </View>
    )
}
