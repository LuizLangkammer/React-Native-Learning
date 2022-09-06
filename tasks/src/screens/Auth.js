import React, { useState } from 'react';
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';


export default (props) => {

    //States ==========================================================================================
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
        >
            <Text style={styles.title}>Tasks</Text>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder='E-mail'
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    style={styles.input}
                />
                 <TextInput
                    placeholder='Senha'
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    style={styles.input}
                />
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 70,
        color: commonStyles.colors.secundary,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        paddingVertical: 35,
        paddingHorizontal: 20,
        width: '85%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    }
})