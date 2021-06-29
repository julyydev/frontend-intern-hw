import React, {useState, useEffect, useRef} from 'react'
import {View, Text, Button, Image, Animated, StyleSheet} from 'react-native'
import {RootStackParamList} from '../navigation/ParamList'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'

const Flickr_API =
    'https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any' +
    '&format=json&nojsoncallback=1';

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feed'>
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>

type Props = {
  navigation: FeedScreenNavigationProp
  route: FeedScreenRouteProp
}

export const FeedScreen: React.FC<Props> = (Props) => {
  const {navigation, route} = Props

  const second = route.params?.second
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [image, setImage] = useState();
  const [index, setIndex] = useState(0);

  const fadeIn = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  });

  const fadeOut = Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (index >= 20) {
      setIndex(0);
    }
    void fetch(Flickr_API)
      .then(response => {
        return response.json();
      })
      .then(j => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setImage(j.items[index].media.m);
      })
      .then(() => {
        Animated.sequence([fadeIn, Animated.delay(second * 1000), fadeOut]).start(
          () => {
            setIndex(index + 1);
          },
        );
      });
  }, [index]);

  return (
    <View style={styles.mainView}>
      <Animated.View
        style={[
          styles.section1View,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Image style={styles.imageSet} source={{uri: image}} />
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
