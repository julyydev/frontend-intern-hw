import React from 'react'
import {View, Text, Button} from 'react-native'
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

  const backScreen = () => {
    if (whatScreen === 'Home')
      navigation.navigate('Home')
    else if (whatScreen === 'Feed')
      navigation.navigate('Feed')
  }

  return (
    <View>
      <Button title='원래화면으로'
        onPress={backScreen}
      />
      <Text>{whatScreen}</Text>
    </View>
  )
}
