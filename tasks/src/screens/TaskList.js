import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';



export default (props) => {

    //States ===================================================================================
    const [tasks, setTasks] = useState([
        {
            id: 1,
            desc: "Estudar React",
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: 2,
            desc: "Codar React",
            estimateAt: new Date(),
            doneAt: null
        },

    ]);
    const [showDoneTasks, setShowDoneTasks] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState([]);
    
    //Effect
    useEffect(() => filterTasks(),[showDoneTasks, tasks]);


    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    const toggleTask = (taskId) => {
        const tasksLocal = [...tasks];
        tasksLocal.forEach((task) => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date();
            }
        })
        setTasks(tasksLocal);
    }

    const toggleFilter = () => {
        setShowDoneTasks(!showDoneTasks)
    }

    const filterTasks = () => {
        let visibleTasksLocal = [] 
        if(showDoneTasks){
            visibleTasksLocal = [...tasks];
        }else{
            visibleTasksLocal = tasks.filter((task) => {
                return !task.doneAt;
            })
        }
        setVisibleTasks(visibleTasksLocal);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={todayImage} style={styles.background}>
                <View style={styles.iconBar}>
                    <TouchableOpacity
                        onPress={toggleFilter}
                    >
                        <Icon 
                            name={showDoneTasks ? "eye" : "eye-slash"}
                            size={20}
                            color={commonStyles.colors.secundary}
                            ></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList
                    data={visibleTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} />}
                />

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
    },
    title: {
        color: commonStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        color: commonStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 40
    }
})