import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

type SetTimeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetTime'>
type SetTimeScreenRouteProp = RouteProp<RootStackParamList, 'SetTime'>

type Props = {
    navigation: SetTimeScreenNavigationProp
    route: SetTimeScreenRouteProp
}

export const SetTimeScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props
  const whatScreen = route.params.screen

  const [text, setText] = useState('');

  const onChangeText = (value: string) => {
    setText(value);
  };

  const backScreen = () => {
    let textToNum = Number(text)
    if (textToNum === 0)
      textToNum = 1

    if (whatScreen === 'Home')
      navigation.navigate('Home', {second: textToNum})
    else if (whatScreen === 'Feed')
      navigation.navigate('Feed', {second: textToNum})
  }

  return (
    <View style={styles.mainView}>
      <Text>이미지 하나가 보여질 시간(1~10초)을 선택하세요.</Text>
      <Picker
        style={styles.pickerSet}
        selectedValue={text}
        onValueChange={value => onChangeText(value)}>
        <Picker.Item label='1초' value='1' />
        <Picker.Item label='2초' value='2' />
        <Picker.Item label='3초' value='3' />
        <Picker.Item label='4초' value='4' />
        <Picker.Item label='5초' value='5' />
        <Picker.Item label='6초' value='6' />
        <Picker.Item label='7초' value='7' />
        <Picker.Item label='8초' value='8' />
        <Picker.Item label='9초' value='9' />
        <Picker.Item label='10초' value='10' />
      </Picker>
      <Button title='원래화면으로'
        onPress={backScreen}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pickerSet: {
    width: 200,
    height: 150,
  },
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
})
