import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {

  const {card, onCardClick, onCardLike, onCardDelete} = props;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);  

  const cardDeleteButtonClassName = (`card__delete ${!isOwn ? 'card__delete_disable' : ''}`); 
  const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_liked' : ''}`;

  function handleClick() {
    onCardClick(card);    
  } 

  function handleLikeClick() {
    onCardLike(card);    
  }   

  function handleDelete() {
    onCardDelete(card);    
  }   

  return (  

    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}></button>
      <div className="card__heading">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
    
  )
}

export default Card;