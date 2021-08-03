import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import axios from 'axios';


class Task extends Component{
    constructor(){
        super();
        this.state={
            checked: false,
            // List is static for now, will add state management later
        //     list: [
        //         {
        //         title: "Task title 1",
        //         date: "July 15, 2021",
        //         day: "Monday"
        //     },
        //     {
        //         title: "Task title 2",
        //         date: "Aug 14, 2021",
        //         day: "Sun"
        //     }
        // ],
        list: [],

        };
    }
    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/albums")
        // .then(response => console.log(response));
        .then(response => this.setState({list: response.data}));
        // this.setState({taskList: useContext(TaskContext)});
    }
    // const list = [
    //     {
    //       name: 'Amy Farha',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //       subtitle: 'Vice President'
    //     },
    //     {
    //       name: 'Chris Jackson',
    //       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //       subtitle: 'Vice Chairman'
    //     },
    //     ... // more items
    // ]
      
      keyExtractor = (item, index) => index.toString();
      
      renderItem = ({ item }) => (
        <ListItem bottomDivider style={styles.taskComponentstyle}>
            <CheckBox
                checked={this.state.checked}
                onPress={() => {
                    this.setState({checked: !this.state.checked});
                console.log(this.state.checked); }}
            />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>{item.day + ", "+ item.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    render(){
        return(
            <View syle={styles.background}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.list}
                    renderItem={this.renderItem}
                />
            </View>
        );
    
    }
}

const styles=StyleSheet.create({
    taskComponentstyle: {
        marginBottom: 5,
    }
});
export default Task;