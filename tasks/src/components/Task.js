import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';



export default (props)=>{


    return (
        <View>
            <View>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text></Text>
            </View>
        </View>
    )


}

function getCheckView(doneAt){
    if(doneAt != null){

    }
    return (
        <View>

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
    }
})