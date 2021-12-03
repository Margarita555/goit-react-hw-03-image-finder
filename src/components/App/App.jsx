import React from "react";
import { Component } from "react/cjs/react.production.min";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import LoadingElement from "../LoadingElement/LoadingElement";
import s from "./App.module.css";

export default class App extends Component {
  myRef = React.createRef();
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error("No images found"));
        })
        .then((resultImages) => {
          if (prevState.searchQuery !== this.state.searchQuery) {
            this.setState({ images: resultImages.hits });
            this.myRef.current.scrollIntoView();
          } else {
            this.setState((prevState) => ({
              images: [...prevState.images, ...resultImages.hits],
            }));
          }
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query });
  };

  onMoreBtnClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={s.app} ref={this.myRef}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && <LoadingElement />}
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
