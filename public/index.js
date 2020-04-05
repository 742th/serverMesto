import './style.css';

import { Api } from '../scripts/api';
import { Card } from '../scripts/card';
import { CardList } from '../scripts/cardList';
import { FormValid } from '../scripts/FormValid';
import { Popup } from '../scripts/popup';
import { PopupImg } from '../scripts/popupEx';
import { UserInfo } from '../scripts/UserInfo';


// ПЕРЕМЕННЫЕ
const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const openButton = root.querySelector('.user-info__button');
const popup = root.querySelector('.popup');
const formCard = document.forms.new;
const editButton = root.querySelector('.user-info__btn');
const popupEdit = root.querySelector('.popup_edit');
const formEdit = document.forms.add;
const imya = root.querySelector('.user-info__name');
const job = root.querySelector('.user-info__job');
const popupImg = root.querySelector('.popup_img');
const logo = root.querySelector('.user-info__photo');
const popupAv = root.querySelector('.popup_ava');
const formAva = document.forms.ava;
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';



// ошибки для валидации
const errors = {
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  missInput: 'Это обязательное поле',
  noError: ''
};


// ОБЪЕКТЫ

const card = new Card();
// Можно лучше -- адрес и токун лучше вынести в отдельные константы
const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: 'bea6708b-d9ac-4fb2-9c3f-0da05735cb87',
    'Content-Type': 'application/json'
  }
});
// создает контейнер с карточками начальными и добавляет новые к остальным
const cartonki = new CardList(placesList, card, formCard, api);
formCard.addEventListener('submit', cartonki.buttonAdd.bind(cartonki));

api.getInitialCards()
  .then((res) => cartonki.render(res))
  .catch((err) => {
    console.log(err);
  });


// попапычи
const pepupEd = new Popup(popupEdit);
const pepup = new Popup(popup);
const pepupIm = new PopupImg(popupImg);
const pepupAv = new Popup(popupAv);

// открывашки
editButton.addEventListener('click', pepupEd.open.bind(pepupEd));
openButton.addEventListener('click', () => pepup.open());
placesList.addEventListener('click', pepupIm.openIm.bind(pepupIm));
logo.addEventListener('click', pepupAv.open.bind(pepupAv));


// обработка формы юзера
const userinfo = new UserInfo(formEdit, api, imya, job, logo, formAva);

// Можно лучше -- вообще этот запрос лучше было бы делать сразу изнутри метода newData, там данные обработать,
// а потом из него же вызвать this.render()
api.loadInfo()
  .then((info) => {
    userinfo.newData(info.name, info.about, info.avatar, info._id);
    userinfo.render();
  });


formEdit.addEventListener('submit', userinfo.updateUserInfo.bind(userinfo));
formAva.addEventListener('submit', userinfo.buttonChangeAva.bind(userinfo));