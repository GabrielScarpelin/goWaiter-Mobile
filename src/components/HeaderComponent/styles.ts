import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
  },
  imageLogo: {
    width: 99.1,
    height: 42,
  },
  imageUser: {
    width: 60.1,
    height: undefined,
    borderRadius: 30,
    aspectRatio: 512 / 512
  }
});