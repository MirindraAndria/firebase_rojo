import React from "react";
import { View,Text,StyleSheet } from "react-native";
const Bonjour =({nom}) =>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour lesy e kk,{nom}!</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container :{
        padding :20,
        backgroundColor : '#e0f7fa',
        borderRadius :10,
        margin : 10,
    },
    text :{
        fontSize : 20,
        color : '#00796b',
    },
});

export default Bonjour;