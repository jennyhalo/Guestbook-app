$(function () {
  $.getJSON("data.json", function (data) {
    var message_data = "";
    $.each(data, function (key, value) {
      message_data += "<tr>";
      message_data += "<td>" + value.username + "</td>";
      message_data += "<td>" + value.country + "</td>";
      message_data += "<td>" + value.message + "</td>";
      message_data += "</tr>";
    });
    $("#table_body").append(message_data);
  });
});
// määritellään muuttuja(nappi) johon tulee toimintoja
const backToTopBtn = document.getElementById("backToTopBtn");
window.onscroll = function () {
  scrollFunction();
};
// tässä functiossa määritellään, että nappi tulee näkyviin kun selataan sivua hieman alemmas, muuten se on näkymätön.
function scrollFunction() {
  if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
// Kun nappia painetaan, pääsee takaisin sivun alkuun
backToTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
