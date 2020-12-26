import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const {onClose, isOpen, submitText, onUpdateUser} = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleOnChangeName(evt) {  
    setName(evt.target.value);
  }

  function handleOnChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name="user" 
      title="Редактировать профиль" 
      submitText={submitText} 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input className="popup__input popup__input_type_name" id="name-input" 
          type="text" name="name" required minLength="2" maxLength="40" 
          value={name} onChange={handleOnChangeName}
        />
        <span className="popup__error" id="name-input-error"></span>
      </label>
      <label className="popup__field">
        <input className="popup__input popup__input_type_about" id="about-input" 
          type="text" name="about" required minLength="2" maxLength="200" 
          value={description} onChange={handleOnChangeDescription}
        />
        <span className="popup__error" id="about-input-error"></span>
      </label>
    </PopupWithForm>

  )
}

export default EditProfilePopup;