import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';

import moment from 'moment';
import 'moment/locale/pt-br';


export default (props)=>{


    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}
    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formatedDate = moment(props.estimatedAt).locale('pt-br')
        .format('ddd, D [de] MMMM');

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
            </View>
        </View>
    )


}

function getCheckView(doneAt){
    if(doneAt != null){
        return (
            <View style={styles.done}>
                <Icon name='check' size={15} color='#FFF'></Icon>
            </View>
        )
    }
    return (
        <View style={styles.pending}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4B7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 16
    },
    date: {
        color: commonStyles.colors.subText,
        fontSize: 14
    }
})