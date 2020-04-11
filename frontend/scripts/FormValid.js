
 export class FormValid {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;


    this.form.addEventListener('input', this.checkInputValidity.bind(this));
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
  }

  checkInputValidity(event) {
    if (event.target.value === '' || event.target.value === null) {
      event.target.nextElementSibling.textContent = this.errors.missInput;

    }

    if (event.target.value.length < 2) {

      event.target.nextElementSibling.textContent = this.errors.tooShort;

    }

    if (event.target.value.length > 30) {

      event.target.nextElementSibling.textContent = this.errors.tooLong;

    }

    if (event.target.validity.valid) {

      event.target.nextElementSibling.textContent = this.errors.noError;
    }

  }
  // чтобы делать кнопку сабмита активной и неактивной.
  setSubmitButtonState(event) {

    if (this.form.checkValidity() === true) {
      event.target.form.lastElementChild.removeAttribute('disabled', true);

    } else {
      event.target.form.lastElementChild.setAttribute('disabled', true);
    }
  }

}