import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    render(){
        return (
            <ul className={s.gallery}>
                {this.props.images.map(({ id, webformatURL, largeImageURL}) => (
                    <ImageGalleryItem key={id} id={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        // toggleModal={this.props.toggleModal}
                        // handleGalleryItemClick={this.props.handleGalleryItemClick }
                    />
                ))}
              
            </ul>
        )
    }
}