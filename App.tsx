import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {RootStackParamList} from './src/navigation/ParamList'
import {HomeScreen} from './src/screen/HomeScreen'
import {FeedScreen} from './src/screen/FeedScreen'
import {TimeSettingScreen} from './src/screen/TimeSettingScreen'

const Stack = createStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home'
          component={HomeScreen}
          options={{title: '시작 화면', headerShown: false}}
        />
        <Stack.Screen name='Feed'
          component={FeedScreen}
          options={{title: '슬라이드쇼', headerShown: false}}
        />
        <Stack.Screen name='TimeSetting'
          component={TimeSettingScreen}
          options={{title: '슬라이드 시간 설정', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
