import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  containerSelectCategory: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  scrollView: {
    width: '100%',
    marginTop: 22,
    marginLeft: 30,

  },
  containerButtonSelect: {
    marginRight: 18,
    display: 'flex',
    alignItems: 'center'
  },
  activeImage: {
    borderRadius: 42,
    borderWidth: 5,
    borderColor: "#971515",
  }, 
  noActiveImage: {
    borderWidth: 0
  }
});