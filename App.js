import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainApp from './MainApp'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


const App = () => {
  return (
    <Provider store={store}>
        <MainApp />
    </Provider>
  )
}

export default App