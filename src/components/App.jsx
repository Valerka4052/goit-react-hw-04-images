import { useState, useEffect } from 'react';
import { getApi, ItemsPerPage } from '../api'
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';


export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQuerry, setSearchQuerry] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage,] = useState(false);
  
 // для кнопки Load more----------------------------
  useEffect(() => {
    if (page > 1) {
     loadMoreAction()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

// Для кнопки Search  ------------------------------
useEffect(() => {
    if (searchQuerry !== '') {
    searchAction()
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchQuerry]);
  
  
  function loadMoreAction() {
    setLoading(true); getApi(searchQuerry, page).then((array) => {
        if (array.length < ItemsPerPage) { setLastPage(true) } setPictures([...pictures, ...array]); setLoading(false)
    });
  };

  
  function searchAction()  {
   if (pictures.length > 0) { setPictures([]) } setLoading(true); getApi(searchQuerry, page)
     .then((array) => {
       if (array.length < ItemsPerPage && array.length > 0) { setLastPage(true) };
       if (array.length === ItemsPerPage) { setLastPage(false) };
       if (array.length) { setPictures(array) }
       else { Notiflix.Notify.failure('Please enter valid search querry'); setPictures([]) } setLoading(false)
     });
  };
  
  
  const getLargeImage = (e) => {
   setLargeImage(e.target.id)
    if(e.target.nodeName==='IMG'){
      setShowModal(true);
    };
  };

 const searchQuerryToState = (value) => {
   if (value === '') {
      setPictures([])
      Notiflix.Notify.warning('Please enter the search querry');
      return;
   };
   setSearchQuerry(value);
   setPage(1)
  };

  const loadMore = () => {
    setPage(page + 1);
  };
  
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
          setShowModal={setShowModal}
        />}
      </div>
    );
  };



