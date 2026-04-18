mport React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";

export default function App() {

return (

<Formik
initialValues={{ email: "" }}
onSubmit={(data) => {
console.log(data);
}}
>

{({ handleChange, handleSubmit, values }) => (

<View>
<Text  style={{marginTop: 200, marginLeft: 40}}>Email:</Text>
<TextInput style={{marginTop: 20, marginLeft: 40}}
placeholder="Enter email"
onChangeText={handleChange("email")}
value={values.email}
/>

<Button title="Submit" onPress={handleSubmit} />

</View>

)}

</Formik>

);
}