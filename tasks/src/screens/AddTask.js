import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';



export default (props) => {
    
    
    return (
        <Modal 
            transparent={true} 
            visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide'
        >
            <TouchableWithoutFeedback
                onPress={props.onCancel}
            >
                <View style={styles.overlay}>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
});