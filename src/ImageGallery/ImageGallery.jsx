import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    render(){
        return (
            <ul className={s.gallery}>
                {this.props.images.map(({ id, webformatURL}) => (
                    <ImageGalleryItem id={id}
                        webformatURL={webformatURL}
                    />
                ))}
              
            </ul>
        )
    }
}