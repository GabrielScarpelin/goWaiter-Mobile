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
    marginTop: 40,
    backgroundColor: 'white',
    width: 240,
    height: 40,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#971515'
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
  },
  checkBoxContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 12
  },
  selectActive: {
    color: 'white',
    height: 36,
    borderRadius: 60,
    backgroundColor: '#971515',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectInactive: {
    color: '#971515',
    height: 36,
    width: '50%',
    borderRadius: 60,
    borderWidth: 0,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});