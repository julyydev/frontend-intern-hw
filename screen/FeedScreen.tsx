import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import {View, Text, Button, Image, Animated, StyleSheet} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

const Flickr_API =
    'https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any' +
    '&format=json&nojsoncallback=1'

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

type Props = {
  navigation: FeedScreenNavigationProp
  route: FeedScreenRouteProp
}

interface Media {
  m: string
}

interface Item {
  media: Media
}

interface Response {
  items: Array<Item>
}

export const FeedScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props

  const second = route.params?.second
  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current
  const [imageArray, setImageArray] = useState<Array<string>>([])
  const [isFetchNeeded, setFetchNeeded] = useState(true)

  const fadeIn1 = Animated.timing(fadeAnim1, {
    toValue: 1,
    duration: 0,
    useNativeDriver: true,
  })

  const fadeOut1 = Animated.timing(fadeAnim1, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  })

  const fadeIn2 = Animated.timing(fadeAnim2, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  })

  const fadeOut2 = Animated.timing(fadeAnim2, {
    toValue: 0,
    duration: 0,
    useNativeDriver: true,
  })

  const fetchImage = useCallback(async (): Promise<Array<string>> => {
    const response = await fetch(Flickr_API)
    const json: Response = (await response.json()) as Response
    return json.items.map((item) => item.media.m)
  }, [])

  useEffect(() => {
    if (isFetchNeeded) {
      void fetchImage()
        .then((newImageArray) => {
          setImageArray((current) => {
            current.push(...newImageArray)
            return current
          })
          setFetchNeeded(false)
        })
    }
  }, [isFetchNeeded])

  const imageView = useMemo(() => {
    if (imageArray.length === 0) {
      return <></>
    }
    return <Image style={styles.imageSet} source={{uri: imageArray[0]}} />
  }, [imageArray])

  const imageView2 = useMemo(() => {
    if (imageArray.length === 0) {
      return <></>
    }
    return <Image style={styles.imageSet} source={{uri: imageArray[1]}} />
  }, [imageArray])

  useEffect(() => {
    Animated.sequence([fadeIn1, Animated.delay(second * 1000), Animated.parallel([fadeOut1, fadeIn2])]).start(
      () => {
        if (imageArray.length === 6) {
          setFetchNeeded(true)
        }
        setImageArray(imageArray.slice(1))
        fadeOut2.start()
      }
    )
  }, [imageArray.length])

  return (
    <View style={styles.mainView}>
      <Animated.View
        style={[
          styles.section1View,
          {
            opacity: fadeAnim1
          },
        ]}>
        {imageView}
      </Animated.View>
      <Animated.View
        style={[
          styles.section1View,
          {
            opacity: fadeAnim2
          },
        ]}>
        {imageView2}
      </Animated.View>
      <View style={styles.section2View}>
        <Text>현재 슬라이드 시간(초)</Text>
        <Text>{second}초</Text>
        <Button title='슬라이드 시간 변경'
          onPress={() => navigation.navigate('SetTime', {screen: 'Feed'})}
        />
        <Button title='홈화면으로'
          onPress={() => navigation.navigate('Home', {second: second})}
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
    position: 'absolute',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section2View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSet: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
})
