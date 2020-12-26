/*данные заполнения*/
export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const cardContainerSelector = '.cards';
export const userNameSelector = '.profile__name';
export const userAboutSelector = '.profile__about';
export const avatarSelector = '.profile__image';

export const popupImageSelector = '.popup_type_image';
export const popupUserInfoSelector = '.popup_type_user';
export const popupAddCardSelector = '.popup_type_card';
export const popupUserAvatarSelector = '.popup_type_avatar';
export const popupConfirmSelector = '.popup_type_confirm';

export const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const token = 'b3f5bad4-676e-42da-8be0-421a5a571e47';

/* импорт картинок */
/*import logoWhiteSvg from '../images/logo-white.svg';
import logoBlackSvg from '../images/logo-black.svg';
import avatarJpg from '../images/avatar.jpg';
import deleteButtonSvg from '../images/delete-button.svg';
import deleteButtonHoverSvg from '../images/delete-button-hover.svg';
import addButtonSvg from '../images/add-button.svg';
import addButtonHoverSvg from '../images/add-button-hover.svg';
import editButtonSvg from '../images/edit-button.svg';
import editButtonHoverSvg from '../images/edit-button-hover.svg';
import likeClickSvg from '../images/like-click.svg';
import likeHoverSvg from '../images/like-hover.svg';
import likeSvg from '../images/like.svg';*/

export default token;