import React from 'react'
import Cat from './Cat'
import Dog from './Dog'

// Check whether true or false which is passed from Parent Component. 
// If True, Cat Component is called.
// If False, Dog Component is called.
class Button extends React.Component{
    render(){
        if(this.props.check){
        return(
            <div>
                <Cat />
            </div>
        )
    } else {
        return(
            <div>
                <Dog />
            </div>
        )
    }
}

}

export default Button