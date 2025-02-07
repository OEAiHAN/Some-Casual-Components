import React from 'react'
import "./Components.css"

//TASK LIST
class TaskInputBar extends React.Component {

    constructor(props) {

        super(props)

        if (typeof (this.props.taskAdd) !== 'function')
            console.error('Error: the param taskAdd should be a function.')
    }

    render() {

        return (

            <span className="task-input task-input-bar">
                <input className="task-input task-input-area" type="text" ref={this.props.textRef}></input>&nbsp;
                <button className="task-input task-add-button" type="button" onClick={this.props.taskAdd}>Add</button>
            </span>
        )
    }
}

class TaskList extends React.Component {

    render() {

        return (
            <ul className="task-list">
                {this.props.items.map(({ id, task }) => {

                    return (
                        <li key={id}>
                            {task}&nbsp;
                            <button className="task-modify-button" type="button" onClick={() => this.props.taskModify(id)}>Modify</button>&nbsp;
                            <button className="task-delete-button" type="button" onClick={() => this.props.taskRemove(id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

class TaskBlock extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            list: [],
            count: 0
        }
        if (localStorage.getItem('taskList') === null)
            localStorage.setItem('taskList', JSON.stringify({ list: [], count: 0 }))
        else
            this.state = JSON.parse(localStorage.getItem('taskList'))

        this.textRef = React.createRef(null)
    };

    updateStorage = () => {

        localStorage.setItem('taskList', JSON.stringify(this.state))
    }

    taskAdd = () => {

        if (this.textRef.current.value === null || this.textRef.current.value === '') {
            alert('No task input.')
            return
        }

        this.setState({

            list: [

                ...this.state.list,
                {
                    id: this.state.count + 1,
                    task: this.textRef.current.value
                },
            ],
            count: this.state.count + 1
        });
    }

    taskRemove = (id) => {

        this.setState({

            list: this.state.list.filter(item => item.id !== id)
        })
    }

    taskModify = (id) => {

        const newTaskName = prompt('Input the new task name: ', `${this.state.list.find((ele) => ele.id === id).task}`)
        if (newTaskName === null || newTaskName === '')
            return
        else
            this.setState({

                list: this.state.list.map((item) => {

                    if (item.id === id)
                        item.task = newTaskName
                    return item
                })
            })
    }


    componentDidUpdate() {

        this.updateStorage()
    }

    render() {

        return (
            <div id="task-block">
                <TaskInputBar taskAdd={this.taskAdd} textRef={this.textRef} />
                <TaskList taskRemove={this.taskRemove} taskModify={this.taskModify} items={this.state.list} />
            </div>
        )
    }
}

export default TaskBlock;