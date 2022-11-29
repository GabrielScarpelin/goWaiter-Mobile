import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  alimentosRemovidos: {
    flexDirection: 'row',
    marginTop: 32,
    marginLeft: 42,
  },
  caixaObservacao: {
    width: '80%',
    borderRadius: 16,
    borderColor: '#971515',
    borderWidth: 2,
    height: 100,
    padding: 8,
    alignSelf: 'center',
    marginTop: 16
  },
  botaoReservar: {
    width: 180,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#971515',
    alignItems: 'center',
    justifyContent: 'center', 
    alignSelf: 'center',
    marginTop: 16
  }
});