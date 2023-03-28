
      // Varmistetaan että sivu on ladattu kokonaan ennenkuin lisäillään kuuntelijoita
      window.onload = event => {
        //   console.log("page is fully loaded");

        var nappi = document.getElementById("btn");

        // Lisätään nappiin kuuntelija, joka hakee kenttien tiedot klikattaessa
        nappi.addEventListener("click", () => {
            $.post("/ajaxmessage",
            {
                username: document.getElementById("username").value,
                country: document.getElementById("country").value,
                message: document.getElementById("message").value
            },
            function (data, status) {
                console.log(data);
                var viestit = document.getElementById("ajaxviestit")
                
                viestit.append(data);
            });

        });
        
        
    };
    
