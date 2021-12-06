import { Component, createPortal } from 'react';
import { ReactComponent as CloseButton } from '../../images/closeBtn.svg';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = e => {
    this.props.toggleModal();
    if (
      e.currentTarget === e.target ||
      e.target.nodeName === 'svg' ||
      e.target.nodeName === 'path'
    ) {
      console.log('r');
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <CloseButton className={s.closeButton} fill="#fff" />
        <div className={s.modal}>
          <img src={this.props.largeImageURL} alt="img" />
        </div>
      </div>,
      modalRoot,
    );
  }
}