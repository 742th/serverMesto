// спец попап для картинок
import { Popup } from './popup.js';

export class PopupImg extends Popup {
  constructor(popup) {
    super(popup);
    this.img = this.popup.querySelector('.popup_img-op');
  }

  openIm(event) {
    if (event.target.classList.contains('place-card__image')) {
      this.popup.classList.add('popup_is-opened');
      this.img.setAttribute('style', `background-image: ${event.target.style.backgroundImage}`);
    }
  }
}
