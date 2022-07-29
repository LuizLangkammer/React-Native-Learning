import React from 'react';
import { View, StyleSheet } from 'react-native';
import params from '../params';


export default (props)=>{

    

    return (
        <View style={styles.container}>
            <View style={[styles.pole, props.big ? styles.poleBig : null]}/>
            <View style={[styles.flag, props.big ? styles.flagBig : null]}/>
            <View style={[styles.base1, props.big ? styles.base1Big : null]}/>
            <View style={[styles.base2, props.big ? styles.base2Big : null]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: params.blockSize/10
    },
    flag: {
        position: 'absolute',
        height: params.blockSize * 0.2,
        width: params.blockSize * 0.25,
        backgroundColor: '#F22',
        marginLeft: params.blockSize/10
    },
    pole: {
        position: 'absolute',
        height: params.blockSize * 0.45,
        width: params.blockSize * 0.1,
        backgroundColor: '#222',
        marginLeft: params.blockSize * 0.35
    },
    base1: {
        position: 'absolute',
        height: params.blockSize * 0.1,
        width: params.blockSize * 0.3,
        backgroundColor: '#222',
        marginLeft: params.blockSize * 0.25,
        marginTop: params.blockSize * 0.45
    },
    base2: {
        position: 'absolute',
        height: params.blockSize * 0.1,
        width: params.blockSize * 0.4,
        backgroundColor: '#222',
        marginLeft: params.blockSize * 0.2,
        marginTop: params.blockSize * 0.55
    },
    flagBig: {
        height: 10,
        width: 14,
        marginLeft: 3
    },
    poleBig: {
        height: 28,
        width: 4,
        marginLeft: 16 
    },
    base1Big: {
        height: 4,
        width: 12,
        marginLeft: 12,
        marginTop: 20 
    },
    base2Big: {
        height: 4,
        width: 20,
        marginLeft: 8,
        marginTop: 24
    }
})