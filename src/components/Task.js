import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SQLiteScreen from '../utils/sqlite';


const Task = ({item}) => {
    const [checked, setChecked] = useState(false);

    const date = new Date(item.datetime);
    var days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var task_id = item.id;

    
    return(
        <ListItem bottomDivider style={styles.taskComponentStyle}>
            <CheckBox
                checked={checked}
                onPress={() => {
                    setChecked(!checked);
                console.log(checked); }}
            />
        <ListItem.Content>
            <ListItem.Title>{item.task_title}</ListItem.Title>
            <ListItem.Subtitle>{moment(date).format("ddd, MMM Do YYYY, h:mm:ss a")}</ListItem.Subtitle>
        </ListItem.Content>
            <TouchableOpacity onPress={() => new SQLiteScreen().deleteById(task_id)}>
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
export default Task;