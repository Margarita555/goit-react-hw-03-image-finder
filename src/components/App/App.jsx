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
          this.setState({
            height: document.body.scrollHeight - 1808,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
    if (this.state.page > 1 && prevState.height !== this.state.height) {
      this.scrollToBottom();
      // this.scrollDown();
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

  scrollToBottom() {
    // const scrollHeight = this.myRef.scrollHeight;
    // const height = this.myRef.clientHeight;
    console.log(document.body.scrollHeight);
    console.log(document.documentElement.scrollTop);
    console.log(document.documentElement.clientHeight);
    const allHeight = document.documentElement.scrollHeight;
    console.log(this.state.height);
    // const height = document.documentElement.scrollTop;
    // const scrollLength = scrollHeight - height;
    const maxScrollTop =
      allHeight - Math.round(document.documentElement.clientHeight / 2);
    console.log(maxScrollTop);
    // this.myRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    window.scrollTo({
      top: this.state.height,
      behavior: 'smooth',
    });
  }

  // scrollDown() {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }

  // scrollToBottom = () => {
  //   const { messageList } = this.refs;
  //   messageList.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //     inline: 'nearest',
  //   });
  // };

  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <Spinner />}
        {this.state.error && (
          <h1 className={s.errorMessage}>{this.state.error.message}</h1>
        )}
        <div ref={this.myRef}>
          <ImageGallery images={this.state.images} />
        </div>
        {this.state.images.length > 0 && (
          <Button onMoreBtnClick={this.onMoreBtnClick} />
        )}
      </div>
    );
  }
}
