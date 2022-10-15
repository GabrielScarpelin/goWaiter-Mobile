import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import imgLocation from '../../assets/location.png'
import imgDesconto from '../../assets/desconto.png'
import imgLike from '../../assets/like1.png'
import { HeaderComponent } from '../../components/HeaderComponent'
import { styles } from './styles';

interface navigationProps{
  navigation: {
    navigate: Function
  }
}

export function Home({ navigation }: navigationProps) {
  return (
    <View style={styles.container}>
      <HeaderComponent navigation={ navigation }/>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.containerButton}>
          <View>
            <Text style={styles.textTitle}>Proximos à mim</Text>
          </View>
          <Image
            source={imgLocation}
            resizeMethod={"scale"}
            resizeMode={"contain"}
            style={styles.imgFigure}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerButton}>
          <Text style={styles.textTitle}>Custo benefício</Text>
          <Image
            source={imgDesconto}
            resizeMethod={"scale"}
            resizeMode={"contain"}
            style={styles.imgFigure}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerButton}>
          <Text style={styles.textTitle}>Melhores avaliados</Text>
          <Image
            source={imgLike}
            resizeMethod={"scale"}
            resizeMode={"contain"}
            style={styles.imgFigure}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}