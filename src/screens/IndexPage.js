import React from "react"
import ReactDOM from "react-dom/client"

import './Screens.css'

import TaskBlock from '../components/TaskBlock'
import { BackgroundBox, BackgroundImageChanger } from '../components/BackgroundImageChanger'
import UsualForm from '../components/UsualForm'
import SideBlock from "../components/SideBlock"

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
                    { type: 'color', name: 'namecolor' },
                    { type: 'file', name: 'avator' }
                ]}
                handleSubmit={(formData) => {

                    console.log(JSON.stringify(formData))
                }} />
            <SideBlock>
                <embed className="inner-site" src="http://localhost:3000/" />
            </SideBlock>
        </div>
    </BackgroundBox>
)