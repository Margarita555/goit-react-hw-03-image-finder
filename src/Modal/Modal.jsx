import { Component } from 'react';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import {ReactComponent as CloseButton} from '../images/closeBtn.svg'
// import Loading from '../Loader/Loader';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
   
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        
        if(e.code === 'Escape'){
           this.props.toggleModal()
        }
    }
    handleBackdropClick = e => {
        //  console.log(this.props)
        // console.log(e.target.nodeName)
        this.props.toggleModal()
        //     if (e.currentTarget !== e.target ){
        //     this.props.toggleModal()
        // }
        if (e.currentTarget === e.target || e.target.nodeName === 'svg' || e.target.nodeName === 'path'){
            this.props.toggleModal()
        }
    }

    render() {
        return createPortal(
            <div className={s.overlay} onClick={this.handleBackdropClick}>
                <CloseButton className={s.CloseButton} fill="#fff"/>
                <div className={s.modal}>
                    {/* <Loading /> */}
                    
                    <img src={this.props.largeImageURL} alt="img" />
                    
                </div>
            </div>,
            modalRoot,
        )
    }
}