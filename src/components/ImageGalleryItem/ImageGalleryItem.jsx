import { Component } from 'react';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <li
        key={this.props.id}
        className={s.galleryItem}
        onClick={this.toggleModal}
      >
        <img
          className={s.galleryItemImage}
          src={this.props.webformatURL}
          alt="img"
        />
        {this.state.showModal && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
