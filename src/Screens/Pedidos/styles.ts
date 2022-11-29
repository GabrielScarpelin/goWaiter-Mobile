import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  activityIndicator: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ItemContainer: {
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
  }
});