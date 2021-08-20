import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Task from '../components/Task';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/todo';


const TaskListScreen = (props) => {

    const [selectedValue, setSelectedValue] = useState("all");

    let keyExtractor = (item, index) => index.toString();

    renderTask = ({ item }) => (
        <Task item={item}/>
    );
    // console.log("Props in taskListScreen: ", props);
        return (
            <>
            <View style={styles.header}>
                <FontAwesome name="check-circle" style={styles.checkIconStyle}/>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="white"
                    selectedValue={selectedValue}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="All Lists" style={{ fontSize: 20 }} value="all"/>
                        <Picker.Item label="Default" style={{ fontSize: 20 }} value="default"/>
                        <Picker.Item label="Personal" style={{ fontSize: 20 }} value="personal"/>
                        <Picker.Item label="Shopping" style={{ fontSize: 20 }} value="shopping"/>
                        <Picker.Item label="Wishlist" style={{ fontSize: 20 }} value="wishlist"/>
                        <Picker.Item label="Work" style={{ fontSize: 20 }} value="work"/>
                    </Picker>
                <FontAwesome name="search" style={styles.searchIconStyle}/>
                <FontAwesome name="ellipsis-v" style={styles.ellipseIconStyle}/>
            </View>
            <View style={styles.background}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={props.tasks}
                    renderItem={renderTask}
                />
            </View>
            <View style={styles.addTaskButton}> 
                <TouchableOpacity onPress={() => props.navigation.navigate("AddTask")}>
                    <FontAwesome name="plus" style={styles.addIconStyle}/>
                </TouchableOpacity>
            </View>
            </>
            
        );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'teal',
    //   backgroundColor: '#F8F8F8',
      height: 50,
      flexDirection:"row",
      paddingTop:5,
    },
    checkIconStyle: {
        color: "white",
        fontSize: 30,
        margin: 5,
        marginLeft: 15,
        // flex: 1
    },
    pickerStyle: {
        // fontSize: 20,
        margin: 5,
        flex: 0,
        width: 180,
        alignSelf: "center",
        color:"white"
      },
    searchIconStyle: {
        color: "white",
        fontSize: 25,
        margin: 5,
        marginRight: 15,
        flex: 1,
        textAlign: "right"
    },
    ellipseIconStyle: {
        color: "white",
        fontSize: 25,
        margin: 5,
        marginRight: 15,
    },
    addTaskButton: {
        backgroundColor: "teal",
        borderRadius: 50,
        height:75,
        width: 75,
        margin: 15,
        position: "absolute", // Show the button at the botom of the screen
        bottom: 0, // Show the button at the bottom of the screen
        right:5,
        alignSelf: "flex-end",
    },
    addIconStyle: {
        color: "white",
        fontSize: 25,
        margin: 25,
        alignSelf: "center",
        justifyContent: "center",
    },
    background: {
        flex: 1
    }
  });

const mapStateToProps = (state) => {
    // console.log("MapSate TaskListScreen method called");
    console.log("MapSate in TaskListScreen: ", state.todos);
    return {
        tasks: state.todos // tasks will show up as props in TaskListScreen component
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        // updateTodo: (obj) => dispatch(updateTodo(obj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);