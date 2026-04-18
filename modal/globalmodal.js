

import { Modal, View, Text, Button } from "react-native";
import React,{useState} from 'react';
import styles from "./styles/GlobalStyles"; //

import { StyleSheet } from "react-native";
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container} >
      <Button
      title="open modal"
      onPress={()=>{setModalVisible(true)}}
      />
      <Modal visible={modalVisible}>
        <View style={styles.container}>
          <Text>This is a modal popup!</Text>
          <Button 
          title="close modal"
          onPress={()=>{setModalVisible(false)}}
          />
        </View>
      </Modal>
    
     </View>
 
  );
}
