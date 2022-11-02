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
  }
});