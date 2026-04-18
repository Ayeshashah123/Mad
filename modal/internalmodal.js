import { StatusBar } from 'expo-status-bar';
import { Modal, View, Text, Button ,StyleSheet} from "react-native";
import React,{useState} from 'react';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}> 
<Button 
title="Open Modal" 
onPress={() => setModalVisible(true)} 
/> 
<Modal visible={modalVisible}> 
<View styles={styles.container}> 
  <Text>This is a modal popup!</Text>
<Button 
title="Close Modal" 
onPress={() => setModalVisible(false)} 
/> 
</View> 
</Modal> 
</View> 
); 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
