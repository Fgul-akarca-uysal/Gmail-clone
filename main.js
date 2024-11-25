import { ele, renderMails, toggleModal } from "./scripts/ui.js";
import { getDate } from "./scripts/helpers.js";

//*) local storagedsn verileri al ve obje formatina cevir
//projede mail verisi olarak hep bunu kullan diziyi guncellediginde local storage ida guncelle
const strMail = localStorage.getItem("mails") || [];
let mailData = JSON.parse(strMail);

//navbar iicn acilma ve kapanma ozelligi
//hamburger iconuna tiklanma olayini izle
//tiklaninca nav menusune  hide classi ekle
//zaten kapaliyken tiklarsa hide classini kaldir

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

//2) Listelem ozelligi
//kullanici projeye girme aninda mailleri listele
//DOMContentLoaded > tarayicidaki html'in yuklenmesinin bitmesi
//ekran boyutu 1200px altinda ise navbar kapali gelsin
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);
  if (window.innerWidth < 1200) {
    ele.nav.classList.add("hide");
  }
});

//3)modal acma kapama
//olustur butonuna tiklaninca modulu goster (display grid)
//X butonuna veya disari  tiklaninca modali kapat (display none)
ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));
ele.modal.addEventListener("click", (e) => {
  //egerki tiklanilan elemanin classinda modalwrapper varsa calistir
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

//4) mail atma ozelligi
// acilan modal daki formun gonderilme olayini ziliycez
//eger butun inputlar doluysa yeni mail olustur degilse
//degilse kullaniciya uyari ver

ele.modalForm.addEventListener("submit", (e) => {
  //sayfayi yenilemeyi engelle
  e.preventDefault();

  //formdaki inputlarin verilerine erisme
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  //egerki inputlar bossa uyari gonder
  if (receiver === "" || title === "" || message === "") {
    //veya !recevier || !title de yazarsan ayni
    alert("Lutfen butun alanlari doldurun");
  } else {
    //diiziye eklemek icin mail objesi olustur
    const newMail = {
      id: new Date().getTime(),
      sender: "alaattin",
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };
    // yeni maili mailler dizisine ekledik
    mailData.unshift(newMail);

    // mailler disinin son halini local-storege'a kaydettik
    localStorage.setItem("mails", JSON.stringify(mailData));

    // mailler disinin son halini ekrana bastık
    renderMails(mailData);

    //modali kapat
    toggleModal(false);
  }
});

//5) mail silme ozelligi
const handleClick = (e) => {
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;

  // tiklanilan elemanin ids si delete ise maili sil
  if (e.target.id === "delete" && confirm("Maili silmek istiyormusunuz?")) {
    //id si silicegimiz elemana esit olamayan elemanlari filtrele
    mailData = mailData.filter((mail) => mail.id !== Number(mailId));

    //locali guncelle
    localStorage.setItem("mails", JSON.stringify(mailData));
    //maili htmlden kaldir
    mail.remove();
  }
  //tiklanilan eleman yildiz ise maili likela
  if (e.target.id === "star") {
    //1)id sini bildigimiz  mailin butun bilgilerini al
    const found = mailData.find((item) => item.id === Number(mailId));

    //2) objenin yildizli degerini tersine cevir
    found.isStared = !found.isStared;
    //3) local sotrage i guncelle
    localStorage.setItem("mails", JSON.stringify(mailData));
    //4)arayuzu guncelle
    renderMails(mailData);
  }
};
ele.mailsArea.addEventListener("click", handleClick);

//6) nav menusu aktifligi
ele.nav.addEventListener("click", (e) => {
  //egerki ikinci kategoriye yani yildizli kategorisine tiklanirsa
  if (e.target.id === "cat2") {
    //dizi icerisinden sadece yildiz olanlari ala ve ekraan yazdir
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    //butun diziyi ekrana bas
    renderMails(mailData);
  }
});

//7) aratma ozelligi
//kullanicinin snlik olarak inputa her veri girdiignde mailleri
//filtrele

//sayac degiskeni
let timer;
ele.searchInp.addEventListener("input", (e) => {
  //yeni tus vurusunda onceki geri sayimi sifirla
  clearTimeout(timer);
  //fonksiyonu calistirmak icin geri sayim baslat
  timer = setTimeout(() => searchMail(e), 400);
});

function searchMail(e) {
  //arama terimine erisme
  const query = e.target.value;
  console.log("filtreleme yapildi", query);
  //  mail  icerisindeki en az bir deger arattigimiz terimi iceriyorsa
  //maili filtrele
  const filtred = mailData.filter((mail) =>
    Object.values(mail) //objeyi diziye cevir
      .slice(1, 6) //dizinin ihtiyacimiz olan elemanlarini al
      // objenin degerinden en az biri arattigimiz terimi iceriyormu?
      .some((value) => value.toLowerCase().includes(query))
  );

  if (filtred.length === 0) {
    //diizide eleman yoksa uyari bas
    ele.mailsArea.innerHTML =
      '<div class="warn"> Arattiginiz terime uygun mail bulunamadi</div>';
  } else {
    //filtrelenenleri ekraan bas
    renderMails(filtred);
  }
}
