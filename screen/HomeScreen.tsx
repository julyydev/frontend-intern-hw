import React, {useState} from 'react'
import {Text, Button, Alert} from 'react-native'
import styled from '@emotion/native'
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
    <MainView>
      <Section1View>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <LogoImage source={(FlickrLogo)} />
        <Title>Album App</Title>
      </Section1View>
      <Section2View>
        <Text>{isFirst ? '환영합니다. 슬라이드 시간을 설정해주세요.' : '현재 슬라이드 시간(초)'}</Text>
        <Text>{second}{isFirst ? ' ' : '초'}</Text>
        <Button title='슬라이드 시간 변경'
          onPress={moveSetTimeScreen}
        />
        <Button title='슬라이드 시작'
          onPress={moveFeedScreen}
        />
      </Section2View>
    </MainView>
  )
}

const MainView = styled.View({
  backgroundColor: 'white',
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center'
})

const Section1View = styled.View({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center'
})

const Section2View = styled.View({
  flex: 1.7,
  justifyContent: 'center',
  alignItems: 'center'
})

const LogoImage = styled.Image({
  width: 100,
  height: 50,
  resizeMode: 'contain'
})

const Title = styled.Text({
  fontSize: 40,
  fontWeight: 'bold'
})
