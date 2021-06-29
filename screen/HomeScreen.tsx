import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

type Props = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
}

export const HomeScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props

  return (
    <View>
      <Button title='슬라이드 시간 변경'
        onPress={() => navigation.navigate('SetTime', {screen: 'Home'})}
      />
      <Button title='슬라이드 시작'
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  )
}
