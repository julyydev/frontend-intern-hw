import React, {useEffect, useMemo} from 'react'
import {Text, Button, Animated} from 'react-native'
import styled from '@emotion/native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
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
    firstFadeValue,
    secondFadeValue,
    setIsMounted,
    runAnimation,
  } = useFadeAnimation(second)

  const firstImageView = useMemo(() => {
    return <StyledImage source={{uri: imageArray[0]}}/>
  }, [imageArray])
  const secondImageView = useMemo(() => {
    return <StyledImage source={{uri: copyImageArray[1]}}/>
  }, [copyImageArray])

  useEffect(() => {
    runAnimation()
  }, [runAnimation])

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [setIsMounted])

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
          onPress={() => navigation.navigate('TimeSetting', {whatScreen: 'Feed', second: second})}
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

const StyledImage = styled.Image({
  width: 350,
  height: 450,
  resizeMode: 'contain',
})

const TextButtonContainer = styled.View({
  flex: 0.3,
  justifyContent: 'flex-start',
  alignItems: 'center',
})
