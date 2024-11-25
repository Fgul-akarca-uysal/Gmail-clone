//arayuz islemlerini ve html den aldigimiz elemanlari
//cagirdigimiz dosya

//! HTML den cagirilan elemanlar
export const ele = {
  menu: document.querySelector("#menu"),
  nav: document.querySelector("nav"),
  mailsArea: document.querySelector(".mails"),
  modal: document.querySelector(".modal-wrapper"),
  createBtn: document.querySelector(".create"),
  closeBtn: document.querySelector(".close-modal"),
  modalForm: document.querySelector(".modal"),
  searchInp: document.querySelector("form #search"),
};

//! ekrana mailleri basan bir fonks.
//mailData: ekrana basilacak olan mailler

//mail alanina bir mail bas
export const renderMails = (mailData) => {
  //maildata da dizisindeki her bir mail icin htmldeki
  //mail html'i olustur ve mail_html dizisini aktar
  const mail_html = mailData.map((mail) => {
    return `
              <div class="mail"  data-id="${mail.id}">
                <div class="info">
                  <input type="checkbox" />
                  <i id="star" class="bi ${
                    mail.isStared ? "bi-star-fill" : "bi-star"
                  }"></i>
                  <b>${mail.sender}</b>
                </div>
    
                <div class="content">
                  <p class="title">${mail.title}</p>
                  <p class="desc">
                    ${mail.message}
                  </p>
                </div>
    
                <p class="time">${mail.date}</p>
               
                <div id="button-wrapper">
                  <button id="delete">Sil</button>
                </div>
              </div>
      `;
  });

  // join > dizi olarak tanımlanmış olan
  // html değişkenini stringe çevirdi
  // html deki mail alanına oluştuduğumuz strngi gönderme
  ele.mailsArea.innerHTML = mail_html.join(" ");
};

//! modali goster gizle
// aldigi parametre true ise modali gosterir false ise gizler

export const toggleModal = (willOpen) => {
  //will open degeri true ise display grid degilse none yapacagiz
  ele.modal.style.display = willOpen === true ? "grid" : "none";
};
