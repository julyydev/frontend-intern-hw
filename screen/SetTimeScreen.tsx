import React, {useState} from 'react'
import {Text, Button} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import styled from '@emotion/native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

type SetTimeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetTime'>
type SetTimeScreenRouteProp = RouteProp<RootStackParamList, 'SetTime'>

type Props = {
    navigation: SetTimeScreenNavigationProp
    route: SetTimeScreenRouteProp
}

const timePickerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
  return <Picker.Item key={`${value}`} label={`${value}초`} value={`${value}`}/>
})

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
    <MainContainer>
      <Text>이미지 하나가 보여질 시간(1~10초)을 선택하세요.</Text>
      <StyledPicker
        selectedValue={text}
        onValueChange={value => onChangeText(value)}>
        {timePickerItems}
      </StyledPicker>
      <Button title='원래화면으로'
        onPress={backScreen}
      />
    </MainContainer>
  )
}

const MainContainer = styled.View ({
  backgroundColor: 'white',
  flex: 1,
  justifyContent: 'space-evenly',
  alignItems: 'center'
})

const StyledPicker = styled.Picker({
  width: 200,
  height: 150
})
