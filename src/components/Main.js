import React from 'react';
import Header from './Header.js';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {
 
  const {cards,
         email, 
         onEditAvatar, 
         onEditProfile, 
         onAddPlace, 
         onCardClick, 
         onCardLike, 
         onCardDelete,
         onSignOut} = props;

  const currentUser = React.useContext(CurrentUserContext);
    
  return (

    <>

    <Header link="/sign-in" textLink="Выйти" email={email} onSignOut={onSignOut}/>

    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="аватар" className="profile__image" />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="cards">

      {
        cards.map((card) => (
          <Card 
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))
      }
      
      </section>

    </main>

    </>
  )

}

export default Main;