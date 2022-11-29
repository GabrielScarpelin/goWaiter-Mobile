import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import setaParaBaixo from '../../assets/setaBaixoDropMenu.png'
import { styles } from './styles';
type DropDownProps = {
    data: [{
        value: string | number
    }],
    onChange?: (newValue: any) => void
}
export function DropDownList(props: DropDownProps) {
  return (
    <TouchableOpacity>
        <View>
            <Text>{props.data[0].value}</Text>
            <Image source={setaParaBaixo}/>
        </View>
    </TouchableOpacity>
  );
}