import {Animated} from 'react-native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useFetchImage} from './useFetchImage'
import {imageSource} from '../assets/source/imageSource'

export const useFadeAnimation = (second: number) => {
  const {imageArray, copyImageArray, setImageArray, setCopyImageArray} = imageSource()
  const [isFetchNeeded, setFetchNeeded] = useState(true)
  const firstFadeValue = useRef(new Animated.Value(0)).current
  const secondFadeValue = useRef(new Animated.Value(0)).current
  const [isFirstDelayOver, setIsFirstDelayOver] = useState(false)
  const [isSecondDelayOver, setIsSecondDelayOver] = useState(false)
  const [firstRun, setFirstRun] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  const {fetchNeeded} = useFetchImage(setFetchNeeded, setImageArray)

  const fadeAnimation = (fadeValue: Animated.Value, toValue: number) => Animated.timing(fadeValue, {
    toValue: toValue,
    duration: 1000,
    useNativeDriver: true,
  })

  const firstImageFadeIn = fadeAnimation(firstFadeValue, 1)
  const firstImageFadeOut = fadeAnimation(firstFadeValue, 0)
  const secondImageFadeIn = fadeAnimation(secondFadeValue, 1)
  const secondImageFadeOut = fadeAnimation(secondFadeValue, 0)

  const firstImageAnimation = useCallback(() => {
    Animated.sequence(
      [firstImageFadeIn, Animated.delay(second * 1000)],
    ).start(() => {
      setCopyImageArray(imageArray)
      setIsFirstDelayOver(true)
      firstImageFadeOut.start(() => {
        setImageArray(imageArray.slice(2))
        if (imageArray.length === 6)
          setFetchNeeded(true)
      })
    })
  }, [imageArray, copyImageArray, second])

  const secondImageAnimation = useCallback(() => {
    Animated.sequence(
      [secondImageFadeIn, Animated.delay(second * 1000)],
    ).start(() => {
      setIsSecondDelayOver(true)
      secondImageFadeOut.start()
    })
  }, [second])

  useEffect(() => {
    if (isFetchNeeded) {
      fetchNeeded()
    }
  }, [isFetchNeeded])

  const runAnimation = useCallback(() => {
    if (isMounted) {
      if (firstRun || isSecondDelayOver) {
        firstImageAnimation()
        setIsSecondDelayOver(false)
        setFirstRun(false)
      } else if (isFirstDelayOver) {
        secondImageAnimation()
        setIsFirstDelayOver(false)
      }
    }
  }, [imageArray, copyImageArray, isFirstDelayOver, isSecondDelayOver, firstRun])

  return {
    imageArray,
    copyImageArray,
    isFirstDelayOver,
    isSecondDelayOver,
    firstFadeValue,
    secondFadeValue,
    setIsMounted,
    runAnimation,
  }
}
