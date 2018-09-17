import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color                 : 'white',
    background            : 'rebeccapurple'
  }
};

const OptionModal = (props) => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    style={customStyles}
  >
    <h3>Selected Option</h3>
    <p>{props.selectedOption}</p>
    <button onClick={props.handleCloseModal}>Okay</button>
  </Modal>
)

export default OptionModal;
