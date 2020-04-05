export class UserInfo {
  constructor(form, api, imya, job, logo, avaForm) {
    this.api = api;
    this.form = form;
    this.imya = imya;
    this.job = job;
    this.name = form.elements.myName;
    this.about = form.elements.about;
    this.logo = logo;
    this.nickname = '';
    this.idUser = '';
    this.aboutUser = '';
    this.avatar = '';
    this.avaForm = avaForm;

  }

  updateUserInfo(event) {
    event.preventDefault();

    this.api.updateUserInfo(event.target.myName.value, event.target.about.value)
      .then((res) => {
        this.nickname = res.name;
        this.aboutUser = res.about;
        this.imya.textContent = res.name;
        this.job.textContent = res.about;
        event.target.closest('.popup').classList.remove('popup_is-opened');
      })
  }

  render() {
    this.name.value = this.nickname;
    this.about.value = this.aboutUser;
    this.imya.textContent = this.nickname;
    this.job.textContent = this.aboutUser;
    this.logo.setAttribute('style', `background-image:url(${this.avatar})`);
  }

  newData(name, about, avatar, id) {
    this.nickname = name;
    this.idUser = id;
    this.aboutUser = about;
    this.avatar = avatar;
  }

  buttonChangeAva (event) {
    event.preventDefault();
    this.api.changeAvatar(event.target.avatar.value)
        .then((res) => {
          this.logo.setAttribute('style', `background-image:url("${res.avatar}")`);
          this.avatar = res.avatar;
          this.avaForm.reset();
          event.target.closest('.popup').classList.remove('popup_is-opened');
        })
        .catch((err)=>console.error(err));
}
}

