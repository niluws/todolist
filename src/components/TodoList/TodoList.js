import React, {Component} from 'react'
import Todo from './Todo'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import ColorBox from './ColorBox'
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all',
            colors: [

                "#FFD37F",
                "#FFFA81",
                "#D5FA80",
                "#78F87F",
                "#79FBD6",
                "#79FDFE",
                "#7AD6FD",
                "#7B84FC",
                "#D687FC",
                "#FF89FD",
            ],
            notes: [],
            noteTitle: '',
            inputColor: '#fff'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)

        this.removeColor = this.removeColor.bind(this)
        this.inputColorHandler = this.inputColorHandler.bind(this)


    }

    //start color

    inputColorHandler(color) {
        this.setState({
            inputColor: color
        })
    }

    removeColor() {
        this.setState({
            inputColor: '#fff'
        })
    }

    //end color

    todoTitleHandler(event) {
        this.setState({
            todoTitle: event.target.value
        })
    }

    addTodo(event) {
        event.preventDefault()
        if (this.state.todoTitle.trim() === '') {
            // Display an error or perform any other action
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Input cannot be empty'
            })
            return;
        }
        let newTodoObject = {
            id: this.state.todos.length + 1,
            title: this.state.todoTitle,
            completed: false,
            color:this.state.inputColor
        }

        this.setState(prevState => {
            return {
                todos: [...prevState.todos, newTodoObject],
                todoTitle: ''
            }
        })

    }

    removeTodo(todoId) {

        let newTodos = this.state.todos.filter(todo => {
            return todo.id !== todoId
        })

        this.setState({
            todos: newTodos
        })
    }

    editTodo(todoId) {

        let newTodos = [...this.state.todos]

        newTodos.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })

        this.setState({
            todos: newTodos
        })

    }

    statusHandler(selectedValue) {

        this.setState({
            status: selectedValue
        });
    }

    render() {
        return (
            <>
                <h1 className='center white'>task list</h1>
                <form onSubmit={this.addTodo}>
                    <Paper
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 400,
                            "box-shadow": 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            backgroundColor: this.state.inputColor
                        }}
                    >

                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Write your task here"
                            inputProps={{'aria-label': 'search google maps'}}
                            value={this.state.todoTitle}
                            onChange={this.todoTitleHandler}


                        />

                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <IconButton color="primary" type='submit' className="todo-button" sx={{p: '10px'}}
                                    aria-label="directions">
                            <AddIcon/>
                        </IconButton>
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>


                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button variant="text" {...bindTrigger(popupState)} endIcon={<ArrowDropDownIcon/>}>
                                        {this.state.status}
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={() => {
                                            popupState.close();
                                            this.statusHandler('all');
                                        }}>All</MenuItem>
                                        <MenuItem onClick={() => {
                                            popupState.close();
                                            this.statusHandler('completed');
                                        }}>Completed</MenuItem>
                                        <MenuItem onClick={() => {
                                            popupState.close();
                                            this.statusHandler('uncompleted');
                                        }}>Uncompleted</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>

                    </Paper>
                    <Stack direction="row" className='color-stack center'>

                        {this.state.colors.map(color => (
                            <ColorBox color={color} key={color} onColor={this.inputColorHandler}/>
                        ))}
                        <IconButton sx={{color:"red",marginLeft:9}} onClick={this.removeColor}>
                            <DeleteForeverIcon/>
                        </IconButton>


                    </Stack>

                </form>


                <div className="todo-container">
                    <ul className="todo-list center">

                        {
                            this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed).map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo}/>

                            ))
                        }

                        {
                            this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.completed).map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo}/>

                            ))
                        }

                        {
                            this.state.status === "all" && this.state.todos.map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo}/>
                            ))
                        }


                    </ul>
                </div>

            </>
        )
    }
}
