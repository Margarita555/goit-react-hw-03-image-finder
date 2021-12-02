import React from 'react';
import { Component } from 'react/cjs/react.production.min';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
// import Modal from './Modal/Modal';
import Loading from '../Loader/Loader';
import s from './App.module.css';



export default class App extends Component{
  myRef = React.createRef()  
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    // showModal: false,
    // largeImageURL: '',
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !==this.state.page) {
      this.setState({ loading: true })
      fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=23351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) { return response.json() }
          return Promise.reject(
            // toast.error('No images found')
            new Error('No images found')
          )
        })
        .then(resultImages => {
          if (prevState.searchQuery !== this.state.searchQuery) {
          this.setState({ images: resultImages.hits })
          this.myRef.current.scrollIntoView()
        } else {
          this.setState(prevState => ({ images: [...prevState.images, ...resultImages.hits] }))}
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({loading: false}))
    }
  }

  handleFormSubmit = query => {
    this.setState({ searchQuery: query })
  };

  onMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  
    // console.log(this.state.page)
  }

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //     // largeImageURL: largeImage
  //   }))
  //   // console.log(this.state.largeImageURL)
  // }
  //  handleGalleryItemClick = (largeImage) => {
  //   this.setState({largeImageURL: largeImage
  //   })
  // }


  render() {

  return (
    <div className={s.App} ref={this.myRef}>
      {/* {this.state.showModal && <Modal largeImageURL={this.state.largeImageURL}
      toggleModal={this.toggleModal}/>} */}
      <Searchbar onSubmit={this.handleFormSubmit} />
      {this.state.loading && <Loading />}
      {/* <ToastContainer/> */}
      {this.state.error && <h1 className={s.errorMessage}>{this.state.error.message}</h1>}
      <ImageGallery images={this.state.images}
        // toggleModal={this.toggleModal}
        // handleGalleryItemClick={this.handleGalleryItemClick }
        />
      
      {this.state.images.length ? <Button onMoreBtnClick={this.onMoreBtnClick}/> : null}
      
    </div>
  );}
}

// import React from 'react';
// import { Component } from 'react/cjs/react.production.min';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import Modal from './Modal/Modal';
// import Loading from './Loader/Loader';
// import s from './App.module.css';



// export default class App extends Component{
//   myRef = React.createRef()  
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     loading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: '',
    
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery || prevState.page !==this.state.page) {
//       this.setState({ loading: true })
//       fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=3351611-7864196d6829752dad19e3759&image_type=photo&orientation=horizontal&per_page=12`)
//         .then(response => {
//           if (response.ok) { return response.json() }
//           return Promise.reject(
//             // toast.error('No images found')
//             new Error('No images found')
//           )
//         })
//         .then(resultImages => {
//           if (prevState.searchQuery !== this.state.searchQuery) {
//           this.setState({ images: resultImages.hits })
//           this.myRef.current.scrollIntoView()
//         } else {
//           this.setState(prevState => ({ images: [...prevState.images, ...resultImages.hits] }))}
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({loading: false}))
//     }
//   }

//   handleFormSubmit = query => {
//     this.setState({ searchQuery: query })
//   };

//   onMoreBtnClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }))
  
//     // console.log(this.state.page)
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       // largeImageURL: largeImage
//     }))
//     // console.log(this.state.largeImageURL)
//   }
//    handleGalleryItemClick = (largeImage) => {
//     this.setState({largeImageURL: largeImage
//     })
//   }


//   render() {
//     // console.log(this.state.images)
//     // console.log(this.state.largeImageURL)
//   return (
//     <div className={s.App} ref={this.myRef}>
//       {this.state.showModal && <Modal largeImageURL={this.state.largeImageURL}
//       toggleModal={this.toggleModal}/>}
//       <Searchbar onSubmit={this.handleFormSubmit} />
//       {this.state.loading && <Loading />}
//       {/* <ToastContainer/> */}
//       {this.state.error && <h1 className={s.errorMessage}>{this.state.error.message}</h1>}
//       <ImageGallery images={this.state.images}
//         toggleModal={this.toggleModal}
//         handleGalleryItemClick={this.handleGalleryItemClick }/>
      
//       {this.state.images.length ? <Button onMoreBtnClick={this.onMoreBtnClick}/> : null}
      
//     </div>
//   );}
// }