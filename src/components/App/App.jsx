import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import s from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
  };
  myRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const isQueryChanged = prevState.searchQuery !== this.state.searchQuery;
    const isPageChanged = prevState.page !== this.state.page;
    if (isQueryChanged || isPageChanged) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('No images found'));
        })
        .then(resultImages => {
          this.setState(prevState => ({
            images: [...prevState.images, ...resultImages.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = query => {
    this.setState({ searchQuery: query });
    this.setState({ images: [] });
    // this.myRef.current.scrollIntoView();
  };

  onMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={s.app} ref={this.myRef}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <Spinner />}
        {this.state.error && (
          <h1 className={s.errorMessage}>{this.state.error.message}</h1>
        )}
        <ImageGallery images={this.state.images} />
        {this.state.images.length > 0 && (
          <Button onMoreBtnClick={this.onMoreBtnClick} />
        )}
      </div>
    );
  }
}
