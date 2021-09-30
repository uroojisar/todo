import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { deleteTodo, setEditMode, finishTodo } from "../actions/todo";


const Task = (props) => {
    const [checked, setChecked] = useState(false);
    const item = props.item;
    const date = new Date(item.datetime);
    var days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var inserttime = item.inserttime;
    
    return(
        <ListItem bottomDivider style={styles.taskComponentStyle}>
            <CheckBox
                checked={checked}
                onPress={() => {
                    setChecked(!checked);
                    // Mark todo/task as 'Finished'.
                    if (checked){
                        props.finishTodo(item);
                        console.log("todo marked as finished"); 
                    }

                }}
            />
        <TouchableWithoutFeedback onPress={() => {
            props.navigation.navigate("AddTask", {todoID: inserttime, editMode: true} );
        }}>
        <ListItem.Content>
                <ListItem.Title>{item.task_title}</ListItem.Title>
            <ListItem.Subtitle>{moment(date).format("ddd, MMM Do YYYY, h:mm:ss a")}</ListItem.Subtitle>
        </ListItem.Content>
        </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => props.deleteTodo(inserttime)}>
                <FontAwesome name="trash" style={styles.trashIconStyle}/>
            </TouchableOpacity>
        </ListItem>
    );

};

const styles=StyleSheet.create({
    taskComponentStyle: {
        marginBottom: 5,
    },
    trashIconStyle: {
        fontSize:20,
        margin: 10
    }
});

const mapDispatchToProps = function(dispatch) {
    return {
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        setEditMode: (mode) => dispatch(setEditMode(mode)),
        finishTodo: (todo) => dispatch(finishTodo(todo)),
    };
};

export default connect(null, mapDispatchToProps)(Task);