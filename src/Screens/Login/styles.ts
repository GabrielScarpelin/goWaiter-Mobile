import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  containerCentral: {
    backgroundColor: '#F0D8D8',
    borderRadius: 40,
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    height: '68%'
  },
  containerButtons:{
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 80,
    marginTop: 40
  },
  inputText: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#971515',
    borderWidth: 2,
    paddingLeft: 12,
    height: 45
  },
  botaoEntrar: {
    backgroundColor: '#971515',
    borderRadius: 50,
    width: 104,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  }
});