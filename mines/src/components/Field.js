import React from 'react';
import { View, StyleSheet } from 'react-native';
import params from '../params';


export default (props) => {

    const fieldStyles = [styles.field];
    //outros estilos ficarão aqui
    if (fieldStyles.length === 1) fieldStyles.push(styles.regular);


    return (
        <View style={fieldStyles}>

        </View>
    )


}


const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular:{
        backgroundColor: "#999",
        borderLeftColor: "#CCC",
        borderTopColor: "#CCC",
        borderRightColor: "#333",
        borderBottomColor: "#333",
    }
})