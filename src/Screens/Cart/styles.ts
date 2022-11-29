import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerWithFlat: {
    flex: 0.9,
    backgroundColor: 'white'
  },
  containerWithoutFlat: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  footerReserva: {
    flex: 0.1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderTopWidth: 0.5
  },
  botaoReservar: {
    width: 140,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#971515',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reservaDateContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    marginTop: 70, 
    marginLeft: 52,
    alignItems: 'center'
  },
  botaoPegarData: {
    borderWidth: 2,
    borderColor: '#971515',
    borderRadius: 7,
    padding: 8,
    marginLeft: 8
  },
  caixaObservacao: {
    width: '80%',
    borderRadius: 16,
    borderColor: '#971515',
    borderWidth: 2,
    height: 150,
    padding: 8
  },
  carrinhoItemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
    alignItems: 'center',
    width: '80%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#971515',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  unidadeContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 44,
    marginTop: 42
  },
  unityTextCount: {
    padding: 4,
    borderWidth: 2,
    borderColor: '#971515',
    borderRadius: 8,
    width: 30,
    height: 30,
    textAlign: 'center',
    marginRight: 32
  },
  shadowProp: {
    elevation: 25,
    shadowColor: '#570d0d',
  }
});