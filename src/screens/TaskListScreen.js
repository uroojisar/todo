import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import Task from '../components/Task';
import { connect } from 'react-redux';


const TaskListScreen = (props) => {

    const [selectedValue, setSelectedValue] = useState("all");
    const [allTodos, setAllTodos] = useState(props.tasks);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    let keyExtractor = (item, index) => index.toString();


    // Due to async nature of hooks, the statement const [allTodos, setAllTodos] = useState(props.tasks) could execute after we read the allTodos array..that's it is set using useEffect hook.
    useEffect(() => {
        setAllTodos(props.tasks);
    },[props.tasks]);

    useEffect(() => {
        setAllTodos(props.tasks.filter((todo) => todo.task_title === searchTerm || todo.task_title.includes(searchTerm)));
        setSearchTerm("");
        
    },[searchFlag]);

    renderTask = ({ item }) => (
        <Task item={item} navigation={props.navigation}/>
    );

    viewTodosbyCategory = (itemValue) => {
        console.log(" Checking todos: ", props);
        setSelectedValue(itemValue);
        // (itemValue === "all") ? setAllTodos(props.tasks.filter((todo) => todo.category != "finished")) : setAllTodos(props.tasks.filter((todo) => todo.category == itemValue));
        (itemValue === "all") ? setAllTodos(props.tasks.filter((todo) => todo.category != "finished")) : setAllTodos(props.tasks.filter((todo) => todo.category == itemValue));
    };
   
        return (
            <>
            <View style={styles.header}>
                <FontAwesome name="check-circle" style={styles.checkIconStyle}/>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="white"
                    selectedValue={selectedValue}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => viewTodosbyCategory(itemValue)}
                    >
                        <Picker.Item label="All Lists" style={{ fontSize: 20 }} value="all"/>
                        <Picker.Item label="Default" style={{ fontSize: 20 }} value="default"/>
                        <Picker.Item label="Personal" style={{ fontSize: 20 }} value="personal"/>
                        <Picker.Item label="Shopping" style={{ fontSize: 20 }} value="shopping"/>
                        <Picker.Item label="Wishlist" style={{ fontSize: 20 }} value="wishlist"/>
                        <Picker.Item label="Work" style={{ fontSize: 20 }} value="work"/>
                        <Picker.Item label="Finished" style={{ fontSize: 20 }} value="finished"/>
                    </Picker>
                    <TextInput placeholder="Search todos" style={styles.searchBarStyle} value={searchTerm} onChangeText={newTerm => setSearchTerm(newTerm)} onSubmitEditing={() => {
                        setSelectedValue("all");
                        setSearchFlag(!searchFlag);
                        }}/>
                    <FontAwesome name="search" style={styles.searchIconStyle}/>
            </View>
            <View style={styles.background}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={allTodos}
                    renderItem={renderTask}
                />
            </View>
            <View style={styles.addTaskButton}> 
                <TouchableOpacity onPress={() => props.navigation.navigate("AddTask", {editMode: false})}>
                    <FontAwesome name="plus" style={styles.addIconStyle}/>
                </TouchableOpacity>
            </View>
            </>
            
        );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'teal',
      height: 50,
      flexDirection:"row",
      paddingTop:5,
    // justifyContent: "space-around"
    },
    checkIconStyle: {
        color: "white",
        fontSize: 30,
        margin: 5,
        marginLeft: 15,
    },
    pickerStyle: {
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
        alignSelf: "center",

    },
    addTaskButton: {
        backgroundColor: "teal",
        borderRadius: 50,
        height:75,
        width: 75,
        margin: 15,
        position: "absolute", // Show the button at the bottom of the screen
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
    },
    searchBarStyle: {
        borderColor: "white",
        borderBottomWidth: 1,
        color: "white",
        margin: 5,
        alignSelf: "center",
    }
  });

const mapStateToProps = (state) => {
    return {
        tasks: state.todos, // tasks will show up as props in TaskListScreen component
    };
};

// const mapDispatchToProps = function(dispatch) {
//     return {
//         // updateTodo: (obj) => dispatch(updateTodo(obj)),
//         setEditMode: (mode) => dispatch(setEditMode(mode)),
//     };
// };

export default connect(mapStateToProps, null)(TaskListScreen);