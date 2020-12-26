import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {

  const {isOpen, onClose, submitText, onUpdateAvatar} = props;

  const avatarRef = React.useRef();

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    avatarRef.current.value = currentUser.avatar;    
  }, [currentUser]); 

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      submitText={submitText} 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input className="popup__input popup__input_type_place" id="place-input" type="url" 
          name="avatar" placeholder="Ссылка" required minLength="1" maxLength="300" 
          ref={avatarRef}
        />
        <span className="popup__error" id="place-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;