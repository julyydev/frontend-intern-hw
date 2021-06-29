import React from 'react'
import {View, Text, Button} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type Props = {
  navigation: HomeScreenNavigationProp
}

export const HomeScreen: React.FC<Props> = (Props) => {
  const {navigation} = Props

  return (
    <View>
      <Button title='슬라이드 시작'
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  )
}
