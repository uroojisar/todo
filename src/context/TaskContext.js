import React from 'react';

const TaskContext = React.createContext();

export const TaskProvider = ({children}) => {
    const taskList = [ {
        title: "Task title 1",
        date: "July 15, 2021",
        day: "Monday"
    },
    {
        title: "Task title 2",
        date: "Aug 14, 2021",
        day: "Sun"
    }];
    return <TaskContext.Provider value={taskList}>
        {children}
        </TaskContext.Provider>;
};

export default TaskContext;