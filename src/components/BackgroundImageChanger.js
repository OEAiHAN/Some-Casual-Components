import React, { createContext } from 'react'
import "./Components.css"

const backgroundBoxContext = createContext()

class BackgroundBoxContextProvider extends React.Component {

    render() {

        return (
            <backgroundBoxContext.Provider value={this.props.value} >
                {this.props.children}
            </backgroundBoxContext.Provider>
        )
    }
}

//BOX COULD BE CHANGED BACKGROUND IMAGE
class BackgroundBox extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            url: localStorage.getItem('backgroundImage')
        }

        this.changeImage = this.changeImage.bind(this)
    }

    changeImage(url) {

        this.setState({

            url: url
        })
    }

    render() {

        return (

            <div className="background-box" style={{

                backgroundImage: `url(${this.state.url})`
            }}>
                <BackgroundBoxContextProvider value={this.changeImage}>
                    {this.props.children}
                </BackgroundBoxContextProvider>
            </div>
        )
    }
}

//BACKGROUND IMAGE CHANGER
class BackgroundImageChanger extends React.Component {

    constructor(props) {

        super(props)

        this.fileRef = React.createRef(null)
    }

    render() {

        return (
            <backgroundBoxContext.Consumer>
                {
                    (value) => {

                        return (

                            <input className="background-image-changer" type="file" ref={this.fileRef} onChange={() => {

                                const file = this.fileRef.current.files[0]
                                if (file !== null) {

                                    const reader = new FileReader()
                                    reader.onload = (e) => {

                                        const url = e.target.result
                                        this.urlRef = url
                                        value(url)
                                    }
                                    reader.readAsDataURL(file)

                                }
                            }} />
                        )
                    }
                }
            </backgroundBoxContext.Consumer>
        )
    }
}

export { BackgroundImageChanger, BackgroundBox };