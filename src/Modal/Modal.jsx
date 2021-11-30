import { Component } from 'react';

import s from './Modal.module.css';

export default class Modal extends Component {
    render(){
        return (
            <div className={s.overlay}>
                <div className={s.modal}>
                    <img src="" alt="" />
                </div>
            </div>
        )
    }
}