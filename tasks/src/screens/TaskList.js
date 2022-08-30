import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

const defaultConfig = {
    tasks: [],
    showDoneTasks: false,
    visibleTasks: [],
    showModal: false
}

export default (props) => {

    //States ===================================================================================
    const [tasks, setTasks] = useState(defaultConfig.tasks);
    const [showDoneTasks, setShowDoneTasks] = useState(defaultConfig.showDoneTasks);
    const [visibleTasks, setVisibleTasks] = useState(defaultConfig.visibleTasks);
    const [showModal, setShowModal] = useState(defaultConfig.showModal);


    //Effect ==================================================================================
    useEffect(() => {
        const initialize = async() => {
            const stateString = await AsyncStorage.getItem("state");
            const state = JSON.parse(stateString) || defaultConfig;

            state.tasks.forEach((task) => {
                task.estimatedAt = new Date(task.estimatedAt)
            })

            setTasks(state.tasks);
            setVisibleTasks(state.visibleTasks);
            setShowDoneTasks(state.showDoneTasks);
            setShowModal(state.showModal)
        }
        initialize()
    },[]);
    useEffect(() => filterTasks(), [showDoneTasks, tasks]);


    

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    const onToggleTask = (taskId) => {
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
        if (showDoneTasks) {
            visibleTasksLocal = [...tasks];
        } else {
            visibleTasksLocal = tasks.filter((task) => {
                return !task.doneAt;
            })
        }
       
        setVisibleTasks(visibleTasksLocal);
        
        AsyncStorage.setItem('state', JSON.stringify({
            tasks,
            showDoneTasks,
            showModal,
            visibleTasks
        }));
    }

    const addTask = (newTask) => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada');
            return;
        };

        const tasksLocal = [...tasks];

        tasksLocal.push({
            id: Math.random().toString(),
            desc: newTask.desc,
            estimatedAt: newTask.date,
            doneAt: null
        });

        setShowModal(false);
        tasksLocal.sort((a, b) => {
            const aDate = a.estimatedAt;
            const bDate = b.estimatedAt
            if(aDate < bDate){
                return -1
            }
            if(aDate > bDate){

                return 1
            }
          

            return 0 
        })
        console.log(tasksLocal)
        setTasks(tasksLocal);
    }

    const deleteTask = (taskId) => {
        const tasksLocal = tasks.filter((task) => {
            return task.id !== taskId;
        });
        setTasks(tasksLocal);
    }

    return (
        <View style={styles.container}>
            <AddTask isVisible={showModal} onCancel={() => { setShowModal(false) }} onSave={addTask} />
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
                    <Text style={styles.title}>Bom dia</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList
                    data={visibleTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Task {...item} onToggleTask={onToggleTask} onDelete={deleteTask} />}
                />
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowModal(true)}
                activeOpacity={0.7}
            >
                <Icon name="plus" size={20}
                    color={commonStyles.colors.secundary}
                />
            </TouchableOpacity>
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
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})