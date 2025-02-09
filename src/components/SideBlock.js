import React from "react";

class SideBlock extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            showState: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {

        this.setState({

            showState: !this.state.showState
        })
    }


    render() {

        return (
            <div className="side-block outline" style={{

                right: this.state.showState ? '20px' : '-460px'
            }}>
                <button className="side-block show-button" type="button" onClick={(e) => this.handleClick(e)}>
                    <div className={ `side-block ${ this.state.showState ? 'right-triangle' : 'left-triangle' }` } />
                </button>
                <div className="side-block main-content-container">
                    {this.props.children
                        ? this.props.children
                        : <h1>Nothing here</h1>}
                </div>
            </div>
        )
    }
}

export default SideBlock;