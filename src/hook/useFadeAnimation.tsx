import {Animated} from 'react-native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useFetchImage} from './useFetchImage'

export const useFadeAnimation = (second: number) => {
  const [imageArray, setImageArray] = useState<Array<string>>([])
  const [isFetchNeeded, setIsFetchNeeded] = useState(true)
  const firstFadeValue = useRef(new Animated.Value(0)).current
  const secondFadeValue = useRef(new Animated.Value(0)).current
  const [isFirstDelayOver, setIsFirstDelayOver] = useState(false)
  const [isSecondDelayOver, setIsSecondDelayOver] = useState(true)
  const [isMounted, setIsMounted] = useState(true)
  const [firstImageUrl, setFirstImageUrl] = useState<string>()
  const [secondImageUrl, setSecondImageUrl] = useState<string>()

  const {pushImageArray} = useFetchImage(setIsFetchNeeded, setImageArray)

  useEffect(() => {
    if (isFetchNeeded) {
      pushImageArray()
    }
  }, [isFetchNeeded, pushImageArray])

  const fadeAnimation = (fadeValue: Animated.Value, toValue: number) => Animated.timing(fadeValue, {
    toValue: toValue,
    duration: 1000,
    useNativeDriver: true,
  })

  const firstImageAnimation = useCallback(() => {
    const firstImageFadeIn = fadeAnimation(firstFadeValue, 1)
    const firstImageFadeOut = fadeAnimation(firstFadeValue, 0)

    Animated.sequence(
      [firstImageFadeIn, Animated.delay(second * 1000)],
    ).start(() => {
      setImageArray((prev) => prev.slice(1))
      setIsFirstDelayOver(true)
      firstImageFadeOut.start()
    })
  }, [firstFadeValue, second])

  const secondImageAnimation = useCallback(() => {
    const secondImageFadeIn = fadeAnimation(secondFadeValue, 1)
    const secondImageFadeOut = fadeAnimation(secondFadeValue, 0)

    Animated.sequence(
      [secondImageFadeIn, Animated.delay(second * 1000)],
    ).start(() => {
      setImageArray((prev) => prev.slice(1))
      setIsSecondDelayOver(true)
      secondImageFadeOut.start()
    })
  }, [secondFadeValue, second])

  useEffect(() => {
    if (isMounted && imageArray.length > 0) {
      const url = imageArray[0]

      if (isSecondDelayOver) {
        setFirstImageUrl(url)
        firstImageAnimation()
        setIsSecondDelayOver(false)
      } else if (isFirstDelayOver) {
        setSecondImageUrl(url)
        secondImageAnimation()
        setIsFirstDelayOver(false)
      }
    }
  }, [isMounted, imageArray, imageArray.length, firstImageAnimation, secondImageAnimation, isFirstDelayOver, isSecondDelayOver])

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [setIsMounted])

  useEffect(() => {
    if (imageArray.length === 6) {
      setIsFetchNeeded(true)
    }
  }, [imageArray.length])

  return {
    firstImageUrl,
    secondImageUrl,
    imageArray,
    isFirstDelayOver,
    isSecondDelayOver,
    firstFadeValue,
    secondFadeValue,
  }
}
