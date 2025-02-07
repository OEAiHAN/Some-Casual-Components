import React from "react"
import ReactDOM from "react-dom/client"

import './screens.css'

import TaskBlock from '../components/TaskBlock'
import { BackgroundBox, BackgroundImageChanger } from '../components/BackgroundImageChanger'
import UsualForm from '../components/UsualForm'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BackgroundBox>
        <div className="content-container">
            <TaskBlock />
            <BackgroundImageChanger />
            <UsualForm
                formItems={[
                    { type: 'text', name: 'rickname' },
                    { type: 'email', name: 'email' },
                    {
                        type: 'radio', name: 'gender', items: {

                            male: true,
                            female: false
                        }
                    },
                    {
                        type: 'checkbox', name: 'hobbies', items: {

                            painting: false,
                            music: false,
                            games: false,
                            sports: false,
                            videos: false,
                            novel: false,
                            science: false
                        }
                    },
                    { type: 'select', name: 'city', items: ['a', 'b', 'c', 'd'] },
                    { type: 'color', name: 'namecolor' }
                ]}
                handleSubmit={(formData) => {

                    console.log(JSON.stringify(formData))
                }} />
        </div>
    </BackgroundBox>
)