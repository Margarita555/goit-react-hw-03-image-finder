import { Component } from 'react/cjs/react.production.min';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import s from './App.module.css';


export default class App extends Component{
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !==this.state.page) {
      this.setState({ loading: true })
      fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) { return response.json() }
          return Promise.reject(
            alert('No images found')
          )
        })
        .then(resultImages => this.setState(prevState => ({ images: [...prevState.images, ...resultImages.hits] })))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({loading: false}))
    }
  }

  handleFormSubmit = query => {
    this.setState({ searchQuery: query })
  };

  onMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))

    console.log(this.state.page)
  }


  render() {
    console.log(this.state)
  return (
    <div className={s.App}>
      <Searchbar onSubmit={this.handleFormSubmit}/>
      <ImageGallery images={this.state.images} />
      {/* {this.state.page > 1 ? <ImageGallery images={this.state.images} /> : null} */}
      {this.state.images.length ? <Button onMoreBtnClick={this.onMoreBtnClick}/> : null}
      
    </div>
  );}
}

