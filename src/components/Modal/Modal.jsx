import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';

const ModalRoot = document.querySelector('#modal-root');

export function Modal ({setShowModal,LargeImage}) {
        
 const  modalEventLisetener = function  (e)  {
        if (e.target.id === 'overlay') { return setShowModal(false) };
    };

        return createPortal(<Overlay onClick={modalEventLisetener} id='overlay'>
            <ModalContainer>
                <img src={LargeImage} alt="" />
            </ModalContainer>
        </Overlay>,
            ModalRoot
        );
    };

Modal.propTypes = {
        LargeImage: PropTypes.string.isRequired,
        toggleModal: PropTypes.func.isRequired,
    };







