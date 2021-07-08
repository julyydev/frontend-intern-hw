import {Animated} from 'react-native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {fetchImage} from './FetchImage'
import { fadeInOutAnimation } from '../component/Animations'

export const useFadeAnimation = (second: number) => {
  const [imageArray, setImageArray] = useState<Array<string>>([])
  const [isImageReady, setImageReady] = useState<boolean>(false)
  const [isFetchNeeded, setIsFetchNeeded] = useState(true)
  const firstFadeValue = useRef(new Animated.Value(0)).current
  const secondFadeValue = useRef(new Animated.Value(0)).current
  const [nextIndex, setNextIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(true)
  const [firstImageUrl, setFirstImageUrl] = useState<string>()
  const [secondImageUrl, setSecondImageUrl] = useState<string>()

  const startImageAnimation = useCallback((index: number, url: string) => {
    console.log(`${Date()}: ${index}`)
    const fadeValue = index === 0 ? firstFadeValue : secondFadeValue

    if (index === 0) {
      setFirstImageUrl(url)
    } else {
      setSecondImageUrl(url)
    }

    fadeInOutAnimation(fadeValue, second, () => {
      setImageArray((prev) => prev.slice(1))
      setNextIndex((prev) => (prev + 1) % 2)
    })
  }, [firstFadeValue, secondFadeValue, second])

  useEffect(() => {
    if (isMounted && isImageReady) {
      startImageAnimation(nextIndex, imageArray[0])
    }
  }, [isMounted, isImageReady, startImageAnimation, nextIndex]) // imageArray 넣으면 망함..

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

  useEffect(() => {
    if (!isFetchNeeded) {
      return
    }
    void fetchImage()
      .then((urls) => {
        setImageArray((current: string[]) => {
          current.push(...urls)
          return current
        })
        setIsFetchNeeded(false)
        setImageReady(true)
      })
  }, [isImageReady, isFetchNeeded])

  return {
    firstImageUrl,
    secondImageUrl,
    imageArray,
    firstFadeValue,
    secondFadeValue,
  }
}
