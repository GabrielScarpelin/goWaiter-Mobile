import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginButton: {
    width: '25%',
    height: '8%',
    backgroundColor: '#971515',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  optionsButton: {
    width: '85%',
    height: 60,
    backgroundColor: '#971515',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 26,
    marginBottom: 51
  },
  dropDownQuestion: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  shadowProp: {
    elevation: 25,
    shadowColor: '#570d0d',
  },
  inputText: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#971515',
    borderWidth: 2,
    paddingLeft: 12,
    height: 45,
    marginTop: 16
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