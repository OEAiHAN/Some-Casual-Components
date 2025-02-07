import React from "react";
import "./Components.css";

const formItemsType = [

    'text',
    'radio',
    'select',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'month',
    'number',
    'password',
    'range',
    'tel',
    'time',
    'url',
    'week',
]

class FormSelectList extends React.Component {

    constructor(props) {

        super(props)

        this.checkProps = this.checkProps.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    checkProps() {

        if (typeof (this.props.items) !== 'object') {

            console.error('FormSelectList: type of "items" must be a string array.')
            return false
        }
        else {

            for (let item of this.props.items)
                if (typeof (item) !== 'string') {

                    console.error('FormSelectList: type of "items" must be a string array.')
                    return false
                }

            if ((new Set(this.props.items)).size !== this.props.items.length) {

                console.error('FormSelectList: all options must be unique.')
                return false
            }
        }

        return true
    }

    handleChange(e) {

        if (this.props.handleChange)
            this.props.handleChange(e)
    }


    render() {

        if (!this.checkProps())
            return null
        else
            return (
                <label key={this.props.name}>
                    <div className="usual-form form-item-header">{this.props.name}</div>
                    <select
                        title={this.props.name}
                        className="usual-form select"
                        name={this.props.name}
                        value={this.props.value}
                        onChange={(e) => this.handleChange(e)}>
                        {this.props.items.map((item) => {

                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })}
                    </select>
                </label>
            )
    }
}

class FormRadioList extends React.Component {

    constructor(props) {

        super(props)

        this.checkProps = this.checkProps.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    checkProps() {

        if (typeof (this.props.items) !== 'object') {

            console.error('UsualForm: type of props "items" must be an object with options as keys and checked status as values.')
            return false
        }
        else {

            let cnt = 0
            for (let key in this.props.items) {

                if (typeof (this.props.items[key]) !== 'boolean') {

                    console.error('FormRadioList: type of props "items" be an object with options as keys and checked statuses(a boolean which is true if checked) as values.')
                    return false
                }
                if (this.props.items[key] === true)
                    ++cnt
            }
            if (cnt !== 1) {

                console.error('FormRadioList: only 1 option can be marked as checked in a radio list.')
                return false
            }
        }

        if (!this.props.handleChange)
            console.warn('FormRadioList: the props "handleChange" is required.')
        else if (typeof (this.props.handleChange) !== 'function') {

            console.error('FormRadioList: type of props "handleChange" must be a function.')
            return false
        }

        return true
    }

    handleChange(e) {

        if (this.props.handleChange)
            this.props.handleChange(e)
    }


    render() {

        if (!this.checkProps())
            return null
        else
            return (
                <label className="usual-form radio-box">
                    <div className="usual-form form-item-header">{this.props.name}</div>
                    <div className="usual-form radio-list">
                        {Object.keys(this.props.items).map((item) => {

                            return (
                                <label key={item}>
                                    <input
                                        className={`usual-form radio${this.props.value === item ? ' checked' : ''}`}
                                        type="radio"
                                        name={this.props.name}
                                        value={item}
                                        onChange={(e) => this.handleChange(e)}
                                        checked={this.props.value === item} />
                                    {item}
                                </label>
                            )
                        })}
                    </div>
                </label>
            )
    }
}

class FormCheckBoxList extends React.Component {

    constructor(props) {

        super(props)

        this.checkProps = this.checkProps.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    checkProps() {

        if (typeof (this.props.items) !== 'object') {

            console.error('UsualForm: type of props "items" must be an object with options as keys and checked status as values.')
            return false
        }
        else
            for (let key in this.props.items)
                if (typeof (this.props.items[key]) !== 'boolean') {

                    console.error('FormCheckBoxList: type of props "items" be an object with options as keys and checked statuses(a boolean which is true if checked) as values.')
                    return false
                }

        if (!this.props.handleChange)
            console.warn('FormCheckBoxList: the props "handleChange" is required.')
        else if (typeof (this.props.handleChange) !== 'function') {

            console.error('FormCheckBoxList: type of props "handleChange" must be a function.')
            return false
        }

        return true
    }

    handleChange(e) {

        if (this.props.handleChange)
            this.props.handleChange(e)
    }


    render() {

        if (!this.checkProps())
            return null
        else
            return (
                <label className="usual-form checkbox-box">
                    <div className="usual-form form-item-header">{this.props.name}</div>
                    <div className="usual-form checkbox-list">
                        {Object.keys(this.props.items).map((item) => {

                            return (
                                <label key={item}>
                                    <input
                                        className={`usual-form checkbox${this.props.items[item] ? ' checked' : ''}`}
                                        type="checkbox"
                                        name={this.props.name}
                                        value={item}
                                        onChange={(e) => this.handleChange(e)}
                                        checked={this.props.items[item]} />
                                    {item}
                                </label>
                            )
                        })}
                    </div>
                </label>
            )
    }
}

class UsualForm extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            correctItemNames: this.checkNames(),
            formData: {}
        }
        for (const { type, name, items } of this.props.formItems) {

            if (type === 'select')
                this.state.formData[name] = items ? items[0] : ''
            else if (type === 'checkbox')
                this.state.formData[name] = items
            else if (type === 'radio')
                this.state.formData[name] = Object.keys(items).filter((item) => items[item] === true)[0]
            else
                this.state.formData[name] = null
        }

        this.checkNames = this.checkNames.bind(this)
        this.transformToFormItem = this.transformToFormItem.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    checkNames() {

        return (new Set(this.props.formItems.map((item) => item.name))).size === this.props.formItems.length
    }

    transformToFormItem(type, name, items) {

        if (typeof (type) !== 'string') {

            console.error('UsualForm: type of "type" for any form item must be a string.')
            return null
        }
        else if (typeof (name) !== 'string') {

            console.error('UsualForm: type of "name" for any form item must be a string.')
            return null
        }
        else {

            let flag = true
            for (const ctype of formItemsType)
                if (type === ctype) {

                    flag = false
                    break
                }
            if (flag) {

                console.error(`UsualForm: invalid form item type. Valid types: ${formItemsType.join(', ')}.`)
                return null
            }
        }

        if (type === 'select') {

            return (
                <FormSelectList
                    key={name}
                    name={name}
                    items={items}
                    value={this.state.formData[name]}
                    handleChange={this.handleChange} />
            )
        }
        else if (type === 'radio') {

            return (
                <FormRadioList
                    key={name}
                    name={name}
                    items={items}
                    value={this.state.formData[name]}
                    handleChange={this.handleChange} />
            )
        }
        else if (type === 'checkbox') {

            return (
                <FormCheckBoxList
                    key={name}
                    name={name}
                    items={this.state.formData[name]}
                    handleChange={this.handleChange} />
            )
        }
        else {

            return (
                <label key={name}>
                    <div className="usual-form form-item-header">{name}</div>
                    <input
                        className={`usual-form ${type}`}
                        type={type} name={name}
                        onChange={(e) => this.handleChange(e)} />
                </label>
            )
        }
    }

    handleChange(e) {

        const type = e.target.type, name = e.target.name

        if (type === 'checkbox') {

            this.setState({

                formData: {

                    ...this.state.formData,
                    [name]: {

                        ...this.state.formData[name],
                        [e.target.value]: e.target.checked
                    }
                }
            })
        }
        else {

            this.setState({

                formData: {

                    ...this.state.formData,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    handleSubmit() {

        let formData = {}
        for (const { type, name } of this.props.formItems) {

            if (type === 'checkbox')
                formData[name] = Object.keys(this.state.formData[name]).filter((item) => this.state.formData[name][item])
            else
                formData[name] = this.state.formData[name]
        }

        this.props.handleSubmit(formData)
    }


    render() {

        if (this.state.correctItemNames)
            return (
                <form className="usual-form">
                    {
                        this.props.formItems.map(({ type, name, items }) => {

                            return this.transformToFormItem(type, name, items)
                        })
                    }
                    <button className="usual-form submit-btn" type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            )
        else {

            console.error('UsualForm: names for form items must be unique in the same form.')
            return null
        }
    }
}

export default UsualForm;