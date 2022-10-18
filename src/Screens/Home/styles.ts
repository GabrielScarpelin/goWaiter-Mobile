import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white'
    
  },
  imagesContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    width: '100%',
  },
  imageLogo: {
    width: 99.1,
    height: 42
  },
  imageUser: {
    width: 42.1,
    height: 40
  },
  containerButton:{
    width: '80%',
    display: 'flex',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    backgroundColor: '#971515',
    borderRadius: 6,
    height: 160,
    marginVertical: 40
  },
  textTitle:{
    fontSize: 28,
    display: 'flex',
    color: 'white',
    maxWidth: '75%',
    fontWeight: 'bold'
  },
  imgFigure: {
    width: 100,
    height: 100
  },
  viewTextButton:{
    textAlign: 'center'
  },
  viewButton:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  }
});