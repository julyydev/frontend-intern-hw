import React from 'react'
import {View, Text, Button} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetTime'>

type Props = {
    navigation: HomeScreenNavigationProp
}

export const SetTimeScreen: React.FC<Props> = (Props) => {
  const {navigation} = Props

  return (
    <View>
      <Button title='홈화면으로'
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}
