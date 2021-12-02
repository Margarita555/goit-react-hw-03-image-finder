import { Component } from 'react';
import Modal from '../Modal/Modal';

import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {

    state={
       showModal: false,
    }

    toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,

    }))
  
  }

//     onGalleryItemClick = () => {
//         this.props.handleGalleryItemClick(this.props.largeImageURL)
//         this.props.toggleModal();
        
//    }

    render(){
        return (
            <li key={this.props.id} className={s.galleryItem} onClick={this.toggleModal}>
               <img className={s.galleryItemImage} src={this.props.webformatURL} alt="img" />
               {this.state.showModal && <Modal largeImageURL={this.props.largeImageURL}
      toggleModal={this.toggleModal}/>}
            </li>
        )
    }
}

// import { Component } from 'react';

// import s from './ImageGalleryItem.module.css';

// export default class ImageGalleryItem extends Component {
//     onGalleryItemClick = () => {
//         // this.props.onGalleryItemClick(this.props.largeImageURL)
//         this.props.handleGalleryItemClick(this.props.largeImageURL)
//         this.props.toggleModal();
        
//    }

//     render(){
//         return (
//             <li key={this.props.id} className={s.galleryItem} onClick={this.onGalleryItemClick}>
//                <img className={s.galleryItemImage} src={this.props.webformatURL} alt="img" />
//               
//             </li>
//         )
//     }
// }