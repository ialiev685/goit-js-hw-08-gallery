import galleryItems from "./gallery-items.js";

const listItemsEl = document.querySelector(".js-gallery");

const modalEl = document.querySelector(".js-lightbox");

const contentModalEl = document.querySelector(".lightbox__image");

listItemsEl.addEventListener("click", onModalOpen);

modalEl.addEventListener("click", onModalClose);

const listMarkup = createListMarkup(galleryItems);

listItemsEl.innerHTML = listMarkup;

function createListMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class='gallery__item'>
        <a
            class='gallery__link'
            href='${original}'
        >
            <img
                class='gallery__image'
                src='${preview}'
                data-source='${original}'
                alt='${description}'
            />
        </a>
      </li>`;
    })
    .join("");
  //
}

function onModalOpen(event) {
  event.preventDefault(); //  отмена перезагрузки страница или переход по ссылке
  if (event.target.nodeName !== "IMG") return;

  modalEl.classList.add("is-open");

  const atrUrlCont = event.target.dataset.source;
  const atrAltCont = event.target.alt;

  addDatatoContentModal(atrUrlCont, atrAltCont);
}

function onModalClose(event) {
  if (event.target.nodeName !== "BUTTON") return;
  if (event.target.dataset.action === "close-lightbox") {
    modalEl.classList.remove("is-open");
  }
  removeDatatoContentModal();
}

function addDatatoContentModal(atrSrc, atrAlt) {
  contentModalEl.src = atrSrc;
  contentModalEl.alt = atrAlt;
}

function removeDatatoContentModal() {
  contentModalEl.src = "";
  contentModalEl.alt = "";
}
