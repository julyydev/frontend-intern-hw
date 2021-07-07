import React, {useEffect} from 'react'
import {Text, Button, Animated} from 'react-native'
import styled from '@emotion/native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import imageView from '../component/ImageView'
import {useFadeAnimation} from '../hook/useFadeAnimation'

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

interface Props {
  navigation: FeedScreenNavigationProp
  route: FeedScreenRouteProp
}

export const FeedScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props

  const second = route.params.second

  const {
    imageArray,
    copyImageArray,
    isFirstDelayOver,
    isSecondDelayOver,
    firstFadeValue,
    secondFadeValue,
    setIsMounted,
    runAnimation,
  } = useFadeAnimation(second)

  useEffect(() => {
    setIsMounted(true)
    runAnimation()
    return () => {
      setIsMounted(false)
    }
  }, [imageArray.length, copyImageArray.length, isFirstDelayOver, isSecondDelayOver])

  const firstImageView = imageView(imageArray[0])
  const secondImageView = imageView(copyImageArray[1])

  return (
    <MainContainer>
      <AnimationContainer>
        <ImageContainer style={[{opacity: firstFadeValue}]}>
          {firstImageView}
        </ImageContainer>
        <ImageContainer style={[{opacity: secondFadeValue}]}>
          {secondImageView}
        </ImageContainer>
      </AnimationContainer>
      <TextButtonContainer>
        <Text>현재 슬라이드 시간(초)</Text>
        <Text>{second}초</Text>
        <Button
          title='슬라이드 시간 변경'
          onPress={() => navigation.navigate('SetTime', {screen: 'Feed', second: second})}
        />
        <Button
          title='홈화면으로'
          onPress={() => navigation.navigate('Home', {second: second})}
        />
      </TextButtonContainer>
    </MainContainer>
  )
}

const MainContainer = styled.SafeAreaView({
  backgroundColor: 'white',
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center',
})

const AnimationContainer = styled.View({
  width: 400,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const ImageContainer = styled(Animated.View)({
  position: 'absolute',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const TextButtonContainer = styled.View({
  flex: 0.3,
  justifyContent: 'flex-start',
  alignItems: 'center',
})
