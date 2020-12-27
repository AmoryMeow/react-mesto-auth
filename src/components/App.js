import React from 'react';
import '../App.css';
import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import picFail from '../images/fail.svg';
import picSuccess from '../images/success.svg';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen,setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen,setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: '', isOpenCard: false});

  const [submitTextSave, setSubmitTextSave]= React.useState('Сохранить');

  // авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessPopupOpen,setSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen,setFailPopupOpen] = React.useState(false);

  // попапы
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
   }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
   }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
   }

  function handleCardClick(card) {
    setSelectedCard({...card, isOpenCard: true});
   }
    
  function closeAllPopups(){
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setFailPopupOpen(false);
    setSuccessPopupOpen(false);
    setSelectedCard({name: '', link: '', isOpenCard: false});
   }

  // получение начальных данных
  React.useEffect(() => {
    api.getAllData()
      .then((allData) => {
        const [profile, initialCards] = allData;
        
        setCards(initialCards);
        setCurrentUser(profile)

      })
      .catch((err) => console.log(err));
  },[])
  
  // данные пользователя
  function handleUpdateUser(data) {
    setSubmitTextSave("Сохранение...");
    api.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .finally(() => {
        setSubmitTextSave("Сохранить");
      });
  }
  
  function handleUpdateAvatar(data){
    setSubmitTextSave("Сохранение...");
    api.changePhoto(data)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
    })
    .finally(() => {
      setSubmitTextSave("Сохранить");
    });
  }

  //карточки
  
  /* лайк карточки */
  function handleCardLike(card) {
    
    const isLiked = card.likes.some(like => like._id === currentUser._id);
  
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      });
  } 

  /* удаление карточки */
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        const newCards = cards.filter((item) => {        
          return item._id !== card._id;
        });
        setCards(newCards);
      })
  }

  /* добавление карточки */
  function handleAddPlaceSubmit(card){
    setSubmitTextSave("Сохранение...");
    api.addCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .finally(() => {
        setSubmitTextSave("Сохранить");
      });
  }

  //авторизация
  function onSubmitRegister(email, password) {

    auth.register(email, password)
    .then((res) => {
      console.log('res: ', res);
      setSuccessPopupOpen(true);
    })
    .catch(err => {
      console.log(err);
      setFailPopupOpen(true);
    })
  }

  function onSubmitLogin(email, password) {
    auth.login(email,password)
      .then((res) => {
        console.log('res: ', res);
      })
      .catch((err) => {
        console.log('err: ', err);
        setFailPopupOpen(true);
      })
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
    <body className="page">
 
      <Switch>

        <ProtectedRoute exact path="/" 
          loggedIn={loggedIn} 
          component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace ={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike ={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Route path="/sign-in">
          
          <Header link="/sign-up" textLink="Регистрация"/>
          <Login onSubmitLogin={onSubmitLogin}/>

        </Route>
        <Route path="/sign-up">
          
          <Header link="/sign-in" textLink="Войти"/>
          <Register onSubmitRegister={onSubmitRegister} />

        </Route>
      </Switch>
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        submitText={submitTextSave}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        submitText={submitTextSave}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        submitText={submitTextSave}
      />

      <PopupWithForm 
        name="confirm" 
        title="Вы уверены?" 
        submitText="Да"
      />
    
      <PopupWithForm 
        name="success"
        isOpen={isSuccessPopupOpen} 
        onClose={closeAllPopups}
        title="Вы успешно зарегистрировались!" 
        img={picSuccess}
      />

      <PopupWithForm 
        name="fail" 
        isOpen={isFailPopupOpen}
        onClose={closeAllPopups}
        title="Что-то пошло не так! Попробуйте еще раз." 
        img={picFail}
      />

      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <Footer />
      
    </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
