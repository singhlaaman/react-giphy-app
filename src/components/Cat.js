import React, { Component } from 'react';
import './Style.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; //For Modal 

class Cat extends Component {
// data: storing all the information of the gifs
// currentPage: current page for the app
// gifsPerPage: Number of Gifs per Page
// modal: state of the modal
// imageSrc: Source of the image from data
// imageTitle: Title of the image from data 
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      gifsPerPage: 10,
      modal: false,
      imageSrc: '',
      imageTitle: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.imageId = this.imageId.bind(this);
  }

  // Setting Current Page to the Event's Target Id
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  // Toggling the state of Modal
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  // Setting the Image Src and Title of the clicked Image
  imageId(event){
      this.setState({
          imageSrc: event.target.src,
          imageTitle: event.target.alt
      })
  }

  componentDidMount() {
    fetch("http://api.giphy.com/v1/gifs/search?q=cat&api_key=5d70ONYFLMXtwvOMuP6bwJ05CSSzHxYC&limit=30")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result.data
          });
        }
      )
  }

  render() {
    const { data, currentPage, gifsPerPage, imageSrc, imageTitle } = this.state;

    const indexOfLastGif = currentPage * gifsPerPage;
    const indexOfFirstGif = indexOfLastGif - gifsPerPage;
    const currentGifs = data.slice(indexOfFirstGif, indexOfLastGif);
    
    const renderGifs = currentGifs.map(data => (
            <img 
            key={data.id} 
            className="eachGif" 
            src = {data.images.downsized.url} 
            alt={data.title} 
            onClick={(event) => { this.toggle(); this.imageId(event);}}
            />
      ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / gifsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <button
            className = "pageNumbers"
            key={number}
            id={number}
            onClick={this.handleClick}
        >
            {number}
        </button>
        )
    )
    return (
    <div className="CatContainer">
        <div className="pageNumbersDiv">
            {renderPageNumbers}
        </div>
        <div className = "gifsDiv">
            {renderGifs}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}><h1>{imageTitle}</h1></ModalHeader>
                <ModalBody>
                    <img src={imageSrc} alt="sh"/>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>
    </div>
    );
  }
}

export default Cat;
