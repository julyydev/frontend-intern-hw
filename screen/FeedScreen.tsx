import React from 'react'
import {View, Text, Button} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

type Props = {
  navigation: FeedScreenNavigationProp
  route: FeedScreenRouteProp
}

export const FeedScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props

  const second = route.params?.second

  return (
    <View>
      <Text>현재 슬라이드 시간(초)</Text>
      <Text>{second}초</Text>
      <Button title='슬라이드 시간 변경'
        onPress={() => navigation.navigate('SetTime', {screen: 'Feed'})}
      />
      <Button title='홈화면으로'
        onPress={() => navigation.navigate('Home', {second: second})}
      />
    </View>
  )
}
