import React from 'react';
import { View, StyleSheet } from 'react-native';
import params from '../params';

export default (props)=>{
    return (
        <View style={styles.container}>
            <View style={styles.coreMine}/>
            <View style={styles.line}/>
            <View style={[styles.line, { transform: [{ rotate: '45deg'}]}]}/>
            <View style={[styles.line, { transform: [{ rotate: '90deg'}]}]}/>
            <View style={[styles.line, { transform: [{ rotate: '135deg'}]}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    coreMine: {
        height: params.blockSize/2,
        width: params.blockSize/2,
        borderRadius: params.blockSize/3,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        position: 'absolute',
        height: params.blockSize/10,
        width: 4*params.blockSize/6,
        borderRadius: 2,
        backgroundColor: 'black'
    }
})