import React, { Component } from 'react'
import BrushIcon from '@mui/icons-material/Brush';
import IconButton from '@mui/material/IconButton';
export default class ColorBox extends Component {

    clickHandler (color) {
        this.props.onColor(color)
    }

    render() {
        let {color} = this.props
        return (
            <IconButton sx={{margin:0,padding:0}} aria-label="brush" onClick={this.clickHandler.bind(this, color)}>
        <BrushIcon sx={{color:color}}/>
      </IconButton>

        )
    }
}
