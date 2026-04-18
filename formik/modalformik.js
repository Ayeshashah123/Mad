import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal } from "react-native";
import { Formik } from "formik";

export default function App() {

const [modalVisible, setModalVisible] = useState(false);

return (

<View>

<View style={{ marginTop: 200 }}>
<Button title="Open Form" onPress={() => setModalVisible(true)} />
</View>

<Modal visible={modalVisible}>

<Formik
initialValues={{ name: "", email: "" }}
onSubmit={(values) => {
console.log(values);
setModalVisible(false);
}}
>

{({ handleChange, handleSubmit, values }) => (

<View style={{ marginTop: 200 }}>

<Text style={{ marginLeft: 40 }}>Name:</Text>
<TextInput 
style={{ marginLeft: 40 }}
placeholder="Enter name"
onChangeText={handleChange("name")}
value={values.name}
/>

<Text style={{ marginLeft: 40, marginTop: 10 }}>Email:</Text>
<TextInput 
style={{ marginLeft: 40 }}
placeholder="Enter email"
onChangeText={handleChange("email")}
value={values.email}
/>

<Button title="Submit" onPress={handleSubmit} />

<View style={{ marginTop: 200 }}>
<Button title="Close" onPress={() => setModalVisible(false)} />
</View>

</View>

)}

</Formik>

</Modal>

</View>

);
}