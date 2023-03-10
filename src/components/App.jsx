// import { Component } from 'react';
import { getApi, ItemsPerPage } from '../api'
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

export function App (){
  // state = {
  //   pictures: [],
  //   searchQuerry: '',
  //   page: 1,
  //   largeImage: "",
  //   showModal: false,
  //   loading: false,
  //   lastPage: false,
  // };


  const [pictures, setPictures] = useState([]);
  const [searchQuerry, setSearchQuerry] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage,] = useState(false);

//  componentDidUpdate(_, prevState) {
//   const { state: { page, searchQuerry }, toggleLoading } = this;
//     if (page > prevState.page && searchQuerry === prevState.searchQuerry) {
//         // Дії для кнопки Load More
//       toggleLoading();
//       getApi(searchQuerry, page)
//         .then((array) => {
//           if (array.length < ItemsPerPage) {
//             this.setState({ lastPage: true })
//           };
//           this.setState(prevState => {
//             return { pictures: [...prevState.pictures, ...array] }
//           });
//           toggleLoading();
//         });
//     } else if (searchQuerry !== prevState.searchQuerry) {
//       // Дії для searchBar
//       if (prevState.pictures.length > 0){
//         this.setState({ pictures: [] })
//       };
//       toggleLoading();
//       getApi(searchQuerry, page)
//         .then((array) => {
//           if (array.length < ItemsPerPage && array.length > 0) {
//             this.setState({ lastPage: true })
//           };
//           if (array.length === ItemsPerPage) {
//             this.setState({ lastPage: false })
//           };
//           if (array.length) {
//             this.setState({ pictures: array })
//           } else {
//             Notiflix.Notify.failure('Please enter valid search querry');
//             this.setState({ pictures: [] })
//           };
//           toggleLoading();
//         })
//     };
//   };
 
const  toggleModal = () => {
    setShowModal(!showModal)
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  // toggleLoading = () => {
  //   this.setState(({ loading }) => ({ loading: !loading }));
  // };

const  getLargeImage = (e) => {
    setLargeImage(e.target.id)
    // this.setState({ largeImage: e.target.id });
    if(e.target.nodeName==='IMG'){
     toggleModal();
    };
  };

const  searchQuerryToState = (value) => {
    if (value === '') {
      setPictures([])
      // this.setState({ pictures: [] });
      Notiflix.Notify.warning('Please enter the search querry');
      return;
    };
    setSearchQuerry(value);
    setPage(1)
    // this.setState({
    //   searchQuerry: value,
    //   page: 1,
    // });
  };

const  loadMore = () => {
    setPage(page + 1)
    // this.setState(({ page }) => { return { page: page + 1 } });
  };
  
  
  // render() {

    // const {toggleModal, searchQuerryToState, loadMore, getLargeImage, state: {lastPage, pictures, largeImage, showModal, loading } } = this;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px'
        }}
      >
        <SearchBar
          onSearch={searchQuerryToState} />
        {pictures.length > 0 && <ImageGallery
          array={pictures}
          getLargeImage={getLargeImage} />}
        {loading && <Loader />}
        {!loading && pictures.length > 0 && !lastPage && <Button loadMore={loadMore} />}
        {showModal && <Modal
          LargeImage={largeImage}
          toggleModal={toggleModal}
        />}
      </div>
    );
  };
// };


