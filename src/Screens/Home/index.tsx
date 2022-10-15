import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBarStyle, StatusBar, Button } from 'react-native';
import logoGoWaiter from '../../assets/logo.png'
import imgUser from '../../assets/perfil-cima.png'
import imgLocation from '../../assets/location.png'
import imgDesconto from '../../assets/desconto.png'
import imgLike from '../../assets/like1.png'
import { ButtonTouchable } from '../../components/ButtonTouchable';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <Image
          source={logoGoWaiter}
          style={styles.imageLogo}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
        <Image
          source={imgUser}
          style={styles.imageUser}
          resizeMethod={"scale"}
          resizeMode={"contain"}
        />
      </View>
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