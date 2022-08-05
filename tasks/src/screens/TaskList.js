import React from 'react-native';
import { View, ImageBackground, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles'

export default (props)=>{


    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
        <View style={styles.container}>
            <ImageBackground source={todayImage} style={styles.background}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Hoje</Text>
                <Text style={styles.subtitle}>{today}</Text>
            </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <Text>Opa</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30 
    }
})