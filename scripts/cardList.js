// создает контейнер с карточками начальными и добавляет новые к остальным
 export class CardList {
    constructor(container, card, form, api) {
        this.api = api;
        this.container = container;
        this.cardsArr = [];
        this.card = card;
        this.form = form;
    }
    
    addCard(name, link, arr, id, ownerId) {
        let element = this.card.create(name, link, arr, id, ownerId);
        this.container.appendChild(element);
        this.cardsArr.push(element);
        element.querySelector('.place-card__like-icon').addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__like-icon_liked')) {
                this.api.deletelikeCard(event.target.closest('.place-card').getAttribute('name'))
                    .then(res => event.target.firstChild.textContent--)
                    .catch(err => console.error(err));
                event.target.classList.remove('place-card__like-icon_liked');
            } else { 
                this.api.likeCard(event.target.closest('.place-card').getAttribute('name'))
                    .then(res => event.target.firstChild.textContent++)
                    .catch(err => console.error(err));
                event.target.classList.add('place-card__like-icon_liked');
            }   
        });
        if (ownerId === "e3f4ed18aa41f88e7c7d1df2") {
        element.querySelector('.place-card__delete-icon').addEventListener('click', (event)=> {
            event.preventDefault();
            if (window.confirm('Вы точно хотите удалить карточку?')) { 
                this.api.deleteCard(event.target.closest('.place-card').getAttribute('name')), this.container.removeChild(event.target.closest('.place-card'));
              }
        });
    }
        
    }

    render(massiv) {
         for (const el of massiv) {
          this.addCard(el.name, el.link, el.likes, el._id, el.owner._id);
         }
         
        
        // for (let i = 0; i < massiv.length; i++) {
        //     this.addCard(massiv[i].name, massiv[i].link);

        // }
    }

    buttonAdd(event) {
        event.preventDefault();
        this.api.addNewCard(this.form.elements.name.value, this.form.elements.link.value)
            .then(res => {
                this.addCard(res.name, res.link, res.likes, res._id, res.owner._id);
                event.target.closest('.popup').classList.remove('popup_is-opened');
                this.form.reset();
                this.form.lastElementChild.setAttribute('disabled', true);
            })
            .catch(err => console.error(err));
        
    }

    
}
