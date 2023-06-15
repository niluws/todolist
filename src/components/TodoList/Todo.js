import React, {Component} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
export default class Todo extends Component {
    removeClickHandler (id) {
        this.props.onRemove(id)
    }

    editClickHandler (id) {
        this.props.onEdit(id)
    }
    render() {

        return (


            // 'completed' class for completed todos
            <div className={`todo ${this.props.completed ? 'completed' : ''}`}>
                <Box sx={{flexGrow: 1, maxWidth: 752}}  >

                    <List sx={{padding:0}}>

                        <ListItem style={{backgroundColor:this.props.color}} >
                            <ListItemText  primary={this.props.title}  />
                            <div >
                                <IconButton edge="end" aria-label="done" onClick={this.editClickHandler.bind(this, this.props.id)}>
                                    <DoneIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="Edit">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={this.removeClickHandler.bind(this, this.props.id)}>
                                    <DeleteIcon/>
                                </IconButton>

                            </div>


                        </ListItem>

                    </List>



                </Box>

            </div>
        )
    }
}