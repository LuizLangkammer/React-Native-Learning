import React, { Component, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';
import moment from 'moment';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';


const defaultConfig = {
    desc: '',
    date: new Date()
}
export default (props) => {
    
    
    //States ==================================================================================
    const [desc, setDesc] = useState(defaultConfig.desc)
    const [date, setDate] = useState(defaultConfig.date)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const save = () => {
        const newTask = {
            desc,
            date
        }
        props.onSave && props.onSave(newTask);
        setDesc(defaultConfig.desc);
        setDate(defaultConfig.date);
    }

    const getDatePicker = () => {
        let datePicker = <DateTimePicker
            value={date}
            onChange={(_,date) => {setShowDatePicker(false); setDate(date);}}
            mode= 'date'
        />

        const dateString = moment(date).format('ddd, D [de] MMMM [de] YYYY');

        if(Platform.OS === 'android'){
            datePicker = ( 
                <View>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker;

    }

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
                {getDatePicker()}
                <View style={styles.buttons}>
                    <TouchableOpacity >
                        <Text style={styles.button} onPress={props.onCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={save}>Salvar</Text>
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
    },
    date: {
        fontSize: 20,
        marginLeft: 15
    }
});