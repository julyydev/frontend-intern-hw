import React, {useState} from 'react'
import {View, Text, Button, Alert, StyleSheet, Image} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FlickrLogo from '../image/FlickrLogo.png'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

type Props = {
  navigation: HomeScreenNavigationProp
  route: HomeScreenRouteProp
}

export const HomeScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props
  const [isFirst, setIsFirst] = useState(true)

  let second: number | undefined

  if (!isFirst)
    second = route.params?.second

  const moveSetTimeScreen = () => {
    if (isFirst)
      setIsFirst(!isFirst)
    navigation.navigate('SetTime', {screen: 'Home'})
  }

  const moveFeedScreen = () => {
    if (isFirst)
      Alert.alert('시간을 선택하지 않았습니다.')
    else
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    { // @ts-ignore
      navigation.navigate('Feed', {second: second})
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.section1View}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image style={styles.imageSet} source={(FlickrLogo)} />
        <Text style={styles.titleSet}>Album App</Text>
      </View>
      <View style={styles.section2View}>
        <Text>현재 슬라이드 시간(초)</Text>
        <Text>{second}{isFirst ? ' ' : '초'}</Text>
        <Button title='슬라이드 시간 변경'
          onPress={moveSetTimeScreen}
        />
        <Button title='슬라이드 시작'
          onPress={moveFeedScreen}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  section1View: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  section2View: {
    flex: 1.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSet: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  buttonSet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSet: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    width: 100,
    height: 50
  },
  textSet: {
    fontFamily: 'Helvetica'
  }
})
