import { Component } from 'react';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import { ReactComponent as CloseButton } from '../../images/closeBtn.svg';
import Spinner from '../Spinner/Spinner';
import s from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    image: '',
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    // this.setState({ image: '' });
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

  handleImageLoaded() {
    this.setState({ image: 'loaded' });
  }

  // handleImageErrored() {
  //   this.setState({ image: 'failed to load' });
  // }

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <CloseButton className={s.closeButton} fill="#fff" />
        <div className={s.modal}>
          {!this.state.image && <Spinner />}
          <img
            src={this.props.largeImageURL}
            alt="img"
            onLoad={this.handleImageLoaded.bind(this)}
            // onError={this.handleImageErrored.bind(this)}
          />
          {/* {this.state.image} */}
        </div>
      </div>,
      modalRoot,
    );
  }
}
