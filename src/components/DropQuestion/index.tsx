import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import setaDireita from '../../assets/setaParaDireita.png'

import { styles } from './styles';
type DropQuestionProps = {
    pergunta: string,
    resposta: string
}
export function DropQuestion(props: DropQuestionProps) {
    const [opened, setOpened] = useState(false)
    const animValue = useRef(new Animated.Value(opened ? 90 : 0)).current
    const contentHeight = useRef(new Animated.Value(opened ? 100 : 0)).current
    const runAnimation = ()=>{
        Animated.timing(animValue, {
            toValue: opened ? 0 : 90,
            useNativeDriver: false,
            duration: 100
        }).start()
        Animated.timing(contentHeight, {
            toValue: opened ? 0 : 100,
            useNativeDriver: false,
            duration: 100
        }).start()
    }

    return (
        <TouchableOpacity style={[{width: '85%', backgroundColor: '#FFFFFF', minHeight: 60, justifyContent: 'center', borderRadius: 16, paddingLeft: 16, marginTop: 32}, styles.shadowProp]} onPress={()=>{
            setOpened((value) => !value)
            runAnimation()
        }}>
            <View>
                <View style={[styles.dropDownQuestion, opened ? {marginTop: 16} : {}]}>
                    <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 20}}>Q:</Text>
                        <Text style={{fontSize: 20, marginLeft: 8}}>{props.pergunta}</Text>
                    </View>
                    <Animated.Image source={setaDireita} style={{rotation: animValue, alignSelf: 'center', marginRight: 24}}/>
                </View>
                <Animated.View style={[{minHeight: contentHeight, marginTop: 16}, opened ? {display: 'flex'} : {display: 'none'}]}>
                    <Text style={{fontSize: 20, marginBottom: 16}}>R: {props.resposta}</Text>
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
}
