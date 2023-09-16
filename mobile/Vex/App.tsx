import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/stack';


export default function App() {
  return (
    <SafeAreaView>
      <Routes />
    </SafeAreaView>
  );
}
