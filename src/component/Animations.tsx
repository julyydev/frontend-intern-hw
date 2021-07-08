import {Animated} from 'react-native'

const fadeAnimation = (fadeValue: Animated.Value, toValue: number) => Animated.timing(fadeValue, {
  toValue: toValue,
  duration: 1000,
  useNativeDriver: true,
})

export const fadeInOutAnimation = (fadeValue: Animated.Value, delaySeconds: number, beforeFadeOut?: () => void) => {
  const fadeIn = fadeAnimation(fadeValue, 1)
  const fadeOut = fadeAnimation(fadeValue, 0)

  Animated.sequence([
    fadeIn,
    Animated.delay(delaySeconds * 1000)
  ]).start(() => {
    beforeFadeOut?.()
    fadeOut.start()
  })
}
