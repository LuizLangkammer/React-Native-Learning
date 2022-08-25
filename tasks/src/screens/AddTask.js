import React, { Component, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput
} from 'react-native';
import commonStyles from '../commonStyles';


const defaultConfig = {
    desc: ''
}
export default (props) => {
    
    
    //States ==================================================================================
    const [desc, setDesc] = useState(defaultConfig.desc)

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
                <View style={styles.overlay}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Informe a descrição" 
                    value={desc}
                    onChangeText={(text) => setDesc(text)}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity >
                        <Text style={styles.button} onPress={props.onCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback
                onPress={props.onCancel}
            >
                <View style={styles.overlay}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        fontSize: 18,
        textAlign: 'center',
        padding: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        paddingHorizontal: 15
    }
});