// создает карточку в ДОМ и вешает на нее лайк и делит

 export class Card {

    create(nameValue, linkValaue, likeArr = [], id, ownerId) {
        
        const placeCard = document.createElement('div');
        const placeImg = document.createElement('div');
        
        const cardDescription = document.createElement('div');
        const placeName = document.createElement('h3');
        const likeButton = document.createElement('button');
        const likeCounter = document.createElement('p');
        
        placeCard.classList.add('place-card');
        placeImg.classList.add('place-card__image');
        
        cardDescription.classList.add('place-card__description');
        placeName.classList.add('place-card__name');
        // чекает на наличие моего лайка, если есть - то отрисует карточку лайкнутой
        if (this.isLiked(likeArr)) {
            likeButton.classList.add('place-card__like-icon_liked');
        }
       
        likeButton.classList.add('place-card__like-icon');
        likeCounter.classList.add('place-card__like-counter');

        placeCard.appendChild(placeImg);
        
        placeCard.appendChild(cardDescription);
        cardDescription.appendChild(placeName);
        cardDescription.appendChild(likeButton);
        likeButton.appendChild(likeCounter);
        

        placeImg.setAttribute('style', `background-image: url(${linkValaue})`);
        placeName.textContent = nameValue;
        likeCounter.textContent = likeArr.length;
        placeCard.setAttribute('name', `${id}`);
        if (ownerId === "e3f4ed18aa41f88e7c7d1df2") {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('place-card__delete-icon');
            placeImg.appendChild(deleteButton);
            deleteButton.setAttribute('name', `${ownerId}`);

        }

        return placeCard;
    }
    // проверяет массив на наличие пользователя в нем
    isLiked(arr) { 
        let answer = false;
        for(const el of arr) {
            if (el._id === "e3f4ed18aa41f88e7c7d1df2") {
                answer = true;
            }
        }
        return answer;
    }

    // remove(event) {
    //     const list = document.querySelector('.places-list');
    //     // if(event.target.name === "e3f4ed18aa41f88e7c7d1df2")  {
    //         list.removeChild(event.target.closest('.place-card'));
    //     // };
    // }
}



