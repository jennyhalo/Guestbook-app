
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
// Estetään sivun vakiotoiminta (päivitys) kun painaa submit nappia
   event.preventDefault();

   const formData = new FormData(formEl);
   const data = Object.fromEntries(formData);
   console.log(data);



})
