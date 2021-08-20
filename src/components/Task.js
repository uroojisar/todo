import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { deleteTodo } from '../actions/todo';
import { connect } from 'react-redux';


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
                console.log(checked); }}
            />
        <ListItem.Content>
            <TouchableOpacity onPress = {() => console.log("Touchable")}>
                <ListItem.Title>{item.task_title}</ListItem.Title>
            </TouchableOpacity>
            <ListItem.Subtitle>{moment(date).format("ddd, MMM Do YYYY, h:mm:ss a")}</ListItem.Subtitle>
        </ListItem.Content>
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
    };
};

export default connect(null, mapDispatchToProps)(Task);