import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';
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
    const [showDoneTasks, setShowDoneTasks] = useState(true);
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    
    //Effect ==================================================================================
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
            <AddTask  isVisible={showModal} onCancel={()=>{setShowModal(false)}} />
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