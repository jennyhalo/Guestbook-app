(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Haetaan lomake johon halutaan lisätä tyyli ja vahvistaminen
      var forms = document.getElementsByClassName("needs-validation");
      // käydään jokainen lomakkeen input kenttä läpi ja estetään tyhjän kentän lähetys
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
