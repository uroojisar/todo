import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import moment from 'moment';


const Task = ({item}) => {
    const [checked, setChecked] = useState(false);

    const date = new Date(item.datetime);
    var days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    
    return(
        <ListItem bottomDivider style={styles.taskComponentstyle}>
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
        </ListItem>
    );

};

const styles=StyleSheet.create({
    taskComponentstyle: {
        marginBottom: 5,
    }
});
export default Task;