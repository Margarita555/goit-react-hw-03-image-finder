import { Component } from 'react';

import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
    render(){
        return (
            <li key={this.props.id} className={s.galleryItem}>
               <img className={s.galleryItemImage} src={this.props.webformatURL} alt="img" />
            </li>
        )
    }
}