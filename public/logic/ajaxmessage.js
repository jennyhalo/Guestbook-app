// Varmistetaan että sivu on ladattu kokonaan ennenkuin lisäillään kuuntelijoita
window.onload = (event) => {
  // Lokitetaan
  console.log("page is fully loaded");
  // Luodaan muuttuja nimeltä 'nappi' joka yhdistetään html dokumentissa olevaan 'btn' id:hen
  var nappi = document.getElementById("btn");
  // Lisätään nappiin kuuntelija, joka hakee kenttien tiedot klikattaessa ja lähettää ne serverin puolelle
  nappi.addEventListener("click", async (e) => {
    // ehkäistään sivun oletusasetus joka päivittää sivun
    e.preventDefault();

    var uname = document.getElementById("username").value;
    var ctry = document.getElementById("country").value;
    var msg = document.getElementById("message").value;

    if (uname) {
      if (ctry) {
        if (msg) {
          // Lähetetään jQuerin ajax-metodilla formin input-kenttien valuet serverin puolelle
          $.post(
            "/ajaxmessage",
            {
              username: document.getElementById("username").value,
              country: document.getElementById("country").value,
              message: document.getElementById("message").value,
            },
            function (data, status) {
              // määritellään id ja haetaan jqueryllä ajaxviestien li elementtien pituus
              var id = $("#ajaxviestit li").length;
              // lokitetaan id
              console.log(id);
              // jokaista läpikäytyä objektia kohden
              data.forEach((obj) => {
                // lisätään 1 id variableen
                id++;
                // muutetaan id 'string' muotoon
                var idstr = id.toString();
                // Html sivulla on Ul elementti id:ll' #ajaxviestit, jonne appendataan li elmentti id:n kanssa
                $("#ajaxviestit").append("<li id ='" + idstr + "' class =\'listStyle\'></li>");
                // käydään läpi jokainen objekti ja haetaan niiden key ja value
                Object.entries(obj).forEach(([key, value]) => {
                  // lokitetaan objectit eli key ja value parit
                  console.log(key, value);

                  if (key === "username_received") {
                    $("#" + idstr).append(value + " " + "from ");
                  }
                  if (key === "country_received") {
                    $("#" + idstr).append(value + ":" + "<br>");
                  }
                  if (key === "message_received") {
                    $("#" + idstr).append(value);
                  }
                });
              });
            }
          );
        } else {
          alert("Please fill all fields in the form!");
        }
      } else {
        alert("Please fill all fields in the form!");
      }
    } else {
      alert("Please fill all fields in the form!");
    }
  });
};
