import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../../services/imagesApi';
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
    height: null,
  };
  myRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const isQueryChanged = prevState.searchQuery !== this.state.searchQuery;
    const isPageChanged = prevState.page !== this.state.page;
    if (isQueryChanged || isPageChanged) {
      this.setState({ loading: true });
      fetchImages(this.state.searchQuery, this.state.page)
        .then(resultImages => {
          this.setState(prevState => ({
            images: [...prevState.images, ...resultImages.hits],
          }));
          this.setScrollHeight();
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
    if (this.state.page > 1 && prevState.height !== this.state.height) {
      this.scrollDown();
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

  setScrollHeight() {
    const searchbarHeight = this.myRef.current.offsetHeight;
    const scrollHeight =
      document.body.scrollHeight -
      (document.body.scrollHeight -
        (document.documentElement.clientHeight +
          document.documentElement.scrollTop -
          searchbarHeight));

    this.setState({
      height: scrollHeight,
    });
  }

  scrollDown() {
    // console.log(this.state.height);
    window.scrollTo({
      top: this.state.height,
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <div className={s.app}>
        <div ref={this.myRef}>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </div>
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
