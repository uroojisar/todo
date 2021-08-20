import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { createTodo, deleteTodo, updateTodo } from '../actions/todo';


class NewTaskScreen extends Component{
    constructor() {
        super();
        this.state={
            title: " ", 
            date: new Date(),
            time: new Date(),
            milliseconds: new Date().getTime(),
            dateMode: 'date',
            timeMode: 'time',
            showDatePicker: false,       
            showTimePicker: false, 
            repeatType: "No Repeat", 
            listType: "Default",   
        };  
    }
    
    onChangeDate(event, selectedDate) {
        const currentDate = selectedDate || this.state.date;

        this.setState({date: currentDate});
        this.setState({showDatePicker:false});
        this.setState({milliseconds:currentDate.getTime()});
    };
    onChangeTime(event, selectedTime) {
        const currentTime = selectedTime || this.state.time;
        this.setState({time: currentTime});
        this.setState({showTimePicker:false});
    };
    
    render() {        
        return (
            <View style={styles.background}>
            <Text style={styles.taskTitleStyle}>Write title of the task</Text>
                <TextInput 
                    placeholder="Add title here"
                    style={styles.inputStyle}
                    value={this.state.title}
                    onChangeText={newTitle => this.setState({title: newTitle})}
                    // onSubmitEditing = {console.log("Textinput: ",this.state.title) }
                    autoCapitalize = "none"
                    autoCorrect ={false}
                />
            <Text style={styles.titleStyle}>Due date</Text>
                <View style={styles.pickerFieldsContainer}>
                    <Text style={styles.dateFieldStyle}>
                        {moment(this.state.date).format('dddd, MMMM Do YYYY')}
                    </Text>                
                    <TouchableOpacity onPress = {() => {this.setState({showDatePicker:true})}}>
                        <FontAwesome name="calendar" style={styles.pickerIconStyle} /> 
                        {this.state.showDatePicker && (<DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.dateMode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeDate.bind(this)}
                        />)}
                    </TouchableOpacity> 
                    <TouchableOpacity onPress = {() => {this.setState({date: new Date()})}}>
                        <FontAwesome name="times-circle" style={styles.pickerIconStyle} />
                    </TouchableOpacity>

                </View>

            <View style={styles.pickerFieldsContainer}>
                <Text style={styles.dateFieldStyle}>
                    {moment(this.state.time).format('LT')}
                </Text>   
                <TouchableOpacity onPress = {() => {this.setState({showTimePicker:true})}}>
                    <FontAwesome name="clock-o" style={styles.pickerIconStyle} /> 
                    {this.state.showTimePicker && (<DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.time}
                        mode={this.state.timeMode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChangeTime.bind(this)}
                    />)}
                </TouchableOpacity> 
                <TouchableOpacity onPress = {() => {this.setState({time: new Date()})}}>
                    <FontAwesome name="times-circle" style={styles.pickerIconStyle} />
                </TouchableOpacity>
            </View>

            <Text style={styles.titleStyle}>Repeat</Text>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="teal"
                    selectedValue={this.state.repeatType}
                    style={styles.repeatPickerStyle}
                    onValueChange={(itemValue) => this.setState({repeatType: itemValue})}>
                        <Picker.Item label="No Repeat" style={styles.pickerItemStyle} value="no repeat"/>
                        <Picker.Item label="Once a Day" style={styles.pickerItemStyle} value="once a day"/>
                        <Picker.Item label="Once a Day (Mon-Fri)" style={styles.pickerItemStyle} value="once a day (mon-fri)"/>
                        <Picker.Item label="Once a Week" style={styles.pickerItemStyle} value="once a week"/>
                        <Picker.Item label="Once a Month" style={styles.pickerItemStyle} value="once a month"/>
                        <Picker.Item label="Once a Year" style={styles.pickerItemStyle} value="once a year"/>
                        <Picker.Item label="Other..." style={styles.pickerItemStyle} value="other"/>

                </Picker>

            <Text style={styles.titleStyle}>Add to List</Text>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="teal"
                    selectedValue={this.state.listType}
                    style={styles.repeatPickerStyle}
                    onValueChange={(itemValue) => this.setState({listType: itemValue})}>
                        <Picker.Item label="Default" style={styles.pickerItemStyle} value="default"/>
                        <Picker.Item label="Personal" style={styles.pickerItemStyle} value="personal"/>
                        <Picker.Item label="Shopping" style={styles.pickerItemStyle} value="shopping"/>
                        <Picker.Item label="Wishlist" style={styles.pickerItemStyle} value="wishlist"/>
                        <Picker.Item label="Work" style={styles.pickerItemStyle} value="work"/>

                </Picker>

            <TouchableOpacity style={styles.addTaskButton} onPress={() => {
                console.log("Typeof(listType): ", typeof(this.state.listType));
                this.props.createTodo({"task_title": this.state.title, "datetime": this.state.milliseconds, "inserttime": new Date().getTime(), "repeat": this.state.repeatType, "category": this.state.listType});
                }}>
            <FontAwesome name="check" style={styles.tickIconStyle}/>
            </TouchableOpacity>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
        flex: 1,
    },
    inputStyle: {
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    taskTitleStyle: {
        fontWeight: "bold",
        margin: 10,
        color: "teal",
        fontSize: 20,
        
    },
    titleStyle: {
        fontWeight: "bold",
        margin: 10,
        color: "teal",
        fontSize: 20,    
        marginTop: 50
    },
    pickerFieldsContainer: {
        flexDirection: "row",
        
    },
    dateFieldStyle: {
        color: "teal",
        borderBottomWidth: 1,
        margin: 10,
        width: 200,
        fontSize: 15
    },
    pickerIconStyle: {
        fontSize: 20,
        color: "teal",
        margin: 10,
    },
    repeatPickerStyle: {
        fontSize: 8,
        width: 230,
        color:"teal",
        marginLeft: 15
      },
    pickerItemStyle: {
        fontSize:16,
    },
    tickIconStyle: {
        color: "white",
        fontSize: 25,
        margin: 20,
        alignSelf: "center",
        justifyContent: "center",
    },
    addTaskButton: {
        backgroundColor: "teal",
        borderRadius: 50,
        height:65,
        width: 65,
        margin: 15,
        position: "absolute", // Show the button at the bottom of the screen
        bottom: 0, // Show the button at the bottom of the screen
        right:5,
        alignSelf: "flex-end",
    },
});

// state is the entire Redux store state
const mapStateToProps = (state) => {
    return {
        tasks: state.todos
    };
};
const mapDispatchToProps = function(dispatch) {
    return {
        createTodo: (obj) => dispatch(createTodo(obj)),
        deleteTodo: (id) => dispatch(deleteTodo(id)),
        updateTodo: (obj) => dispatch(updateTodo(obj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskScreen);