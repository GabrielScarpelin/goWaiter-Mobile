

import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/logoCorInvertida.png'
import fritaBackground from '../../assets/fritasBackground.png'
import lancheBackground from '../../assets/lancheBackground.png'
import erroIcon from '../../assets/botao-x.png'
import { styles } from './styles';
import axios from 'axios'
import { ip } from '../../code/ipMachine'
import CheckBox from 'expo-checkbox';
import { A } from '@expo/html-elements'
import '../../prototype/string.extensions'
interface LoginProps{
    setIsSigned: Function,
    setUserObject: Function
}


export function Login(props: LoginProps) {
    const [loginPage, setLoginPage] = useState(true)
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
                    <TouchableOpacity onPress={()=>{
                        setLoginPage(true)
                    }}
                    style={loginPage ? styles.selectActive : styles.selectInactive}
                    >
                        <Text style={loginPage ? {color: 'white', fontSize: 20} : {color: '#971515', fontSize: 20}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setLoginPage(false)
                    }}
                    style={!loginPage ? styles.selectActive : styles.selectInactive}
                    >
                        <Text style={!loginPage ? {color: 'white', fontSize: 20} : {color: '#971515', fontSize: 20}}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                {loginPage ? <LoginModePage setIsSigned={props.setIsSigned} setUserObject={props.setUserObject} /> : <CadastrarModePage />}
            </View>
            { loginPage ? <Batata /> : <Lanche />}
        </View>
    );
}
function Batata(){
    return (
        <Image 
        source={fritaBackground} 
        style={{position: 'absolute', left: 0, bottom: 0, height: undefined, width: '50%', aspectRatio: 295 / 340}}
        resizeMode={'cover'}
        />
    )
}
function Lanche(){
    return (
        <Image 
                source={lancheBackground} 
                style={{position: 'absolute', right: 0, bottom: 0, height: undefined, width: '50%', aspectRatio: 255 / 253}}
                resizeMode={'cover'}
            />
    )
}


function LoginModePage(props: LoginProps){
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [erroLogin, setErroLogin] = useState(false)
    return (
      <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
        {erroLogin ? <ErroLoginMsg /> : null}
        <TextInput
          placeholder="Email:"
          style={styles.inputText}
          onChangeText={(newEmailText) => {
            setEmailText(newEmailText);
            setErroLogin(false);
          }}
        />
        <TextInput
          placeholder="Senha:"
          style={[styles.inputText, { marginTop: 12 }]}
          secureTextEntry={true}
          onChangeText={(newPasswordText) => {
            setPasswordText(newPasswordText);
            setErroLogin(false);
          }}
        />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginRight: 16, marginTop: 10 }}
        >
          <Text style={{ color: "#7A7272", textDecorationLine: "underline" }}>
            Redefinir senha
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={async () => {
            const response = axios
              .post(`http://${ip}:3333/signin`, {
                email: emailText,
                senha: passwordText,
              })
              .then((response) => {
                const resposta = response.data;
                if (resposta.logged) {
                  props.setUserObject(resposta.user);
                  props.setIsSigned(true);
                } else {
                  setErroLogin(true);
                }
              });
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
}

function CadastrarModePage(){
    const [nome, setNomeText] = useState('')
    const [email, setEmailText] = useState('')
    const [celular, setCelularText] = useState('')
    const [senha, setPasswordText] = useState('')
    const [senhaConfirmacao, setPasswordConfirmText] = useState('')
    const [erroCadastro, setErroCadastro] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [erroText, setErroText ] = useState('')
    const [sucessCadastro, setSucessCadastro] = useState(false)
    return (
        <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            {erroCadastro ? <ErroCadastroMsg texto={erroText}/> : null}
            <TextInput
            placeholder="Nome:"
            style={styles.inputText}
            onChangeText={(newNomeText) => {
            setNomeText(newNomeText);
            setErroCadastro(false);
            }}
            />
            <TextInput
            placeholder="Email:"
            style={[styles.inputText, {marginTop: 12}]}
            onChangeText={(newEmailText) => {
            setEmailText(newEmailText);
            setErroCadastro(false);
            }}
            />
            <TextInput
            placeholder="Celular:"
            style={[styles.inputText, {marginTop: 12}]}
            onChangeText={(newCelularText) => {
            setCelularText(newCelularText);
            setErroCadastro(false);
            }}
            />
            <TextInput
            placeholder="Senha:"
            style={[styles.inputText, {marginTop: 12}]}
            secureTextEntry={true}
            onChangeText={(newSenhaText) => {
            setPasswordText(newSenhaText);
            setErroCadastro(false);
            }}
            />
            <TextInput
            placeholder="Confirme sua senha:"
            style={[styles.inputText, {marginTop: 12}]}
            secureTextEntry={true}
            onChangeText={(newSenhaConfirmText) => {
            setPasswordConfirmText(newSenhaConfirmText);
            setErroCadastro(false);
            }}
            />
            <View style={styles.checkBoxContainer}>
                <CheckBox 
                value={toggleCheckBox}
                color={toggleCheckBox ? '#971515' : undefined}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={{marginLeft: 8}}>Aceitar termos de uso. Clique <A href={`http://${ip}:3333/termosDeUso`}><Text style={{color: '#971515'}}>aqui</Text></A> para saber mais</Text>
            </View>
            <TouchableOpacity style={[styles.botaoEntrar, {width: 155}]}
            onPress={()=>{
                if (senha === senhaConfirmacao && senha.length > 7 && toggleCheckBox === true && email.haveLetter('@')){
                    axios.post(`http://${ip}:3333/cadastrarUsuario`, {
                        nome,
                        email,
                        telefone: celular,
                        senha: senhaConfirmacao
                    }).then(resposta => {
                        const respostaData = resposta.data
                        if (respostaData.duplicate){
                            setErroText('Email já cadastrado')
                            setErroCadastro(true)
                        }
                        else if (respostaData.created) {
                            setSucessCadastro(true)
                            setErroCadastro(false)
                        }
                        else{
                            setErroText('Algo deu errado...')
                            setErroCadastro(true)
                        }
                    })
                }
                else if (toggleCheckBox === false){
                    setErroText('É necessário aceitar os termos de uso!')
                    setErroCadastro(true)
                }
                else if (!email.haveLetter('@')){
                    setErroText('Email inválido!')
                    setErroCadastro(true)
                }
                else {
                    setErroText('Verifique a senha! Vale lembrar que precisa ter no mínimo 7 caracteres')
                    setErroCadastro(true)
                }
            }}
            >
                <Text style={{ color: "white", fontSize: 20 }}>Cadastrar</Text>
            </TouchableOpacity>
            {sucessCadastro ? <CadastradoComSucesso /> : null}
        </View>
    )
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
function ErroCadastroMsg(props: {texto: string}){
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 16, marginBottom: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={erroIcon}
                    style={{height: undefined, width: 16, aspectRatio: 512 / 512}}
                    resizeMode={'cover'}
                />
                <Text style={{color: '#971515', marginLeft: 8}}>{props.texto}</Text>
        </View>
    )
}

function CadastradoComSucesso(){
    return (
        <Text style={{color: 'white', marginTop: 12}}>Cadastro feito com sucesso</Text>
    )
}