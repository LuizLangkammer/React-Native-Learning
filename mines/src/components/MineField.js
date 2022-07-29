import React from 'react';
import { View, StyleSheet } from 'react-native';
import Field from './Field';


export default (props) => {
    const fields = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            return <Field {...field} key={`${c}`}/>
        });
        return <View style={styles.row} key={`${r}`}>{columns}</View>
    });

    return <View style={styles.container}>{fields}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EEE"
    },
    row: {
        flexDirection: 'row',
    }
})