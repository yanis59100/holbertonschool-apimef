let panier = [];
        let total = 0;

        function ajouterAuPanier(nom, prix) {
            panier.push({ nom: nom, prix: prix });
            total += prix;
            afficherPanier();
        }

        function ajouterAuPanier(produit, prix, quantite) {
            quantite = parseInt(quantite, 10);
            if (quantite < 1) {
              alert("Veuillez entrer une quantité valide.");
              return;
            }
      
            const panierListe = document.getElementById("panierListe");
            const totalPrix = document.getElementById("totalPrix");
      
            const item = document.createElement("li");
            item.textContent = `${quantite} x ${produit} - ${prix * quantite}€`;
            panierListe.appendChild(item);
      
            const totalActuel = parseInt(totalPrix.textContent.replace("€", ""), 10);
            const nouveauTotal = totalActuel + prix * quantite;
            totalPrix.textContent = `${nouveauTotal}€`;
          }
      
          function finaliserAchat() {
            alert("Merci pour votre achat !");
            document.getElementById("panierListe").innerHTML = "";
            document.getElementById("totalPrix").textContent = "0€";
          }

        function afficherPanier() {
            const panierListe = document.getElementById('panierListe');
            panierListe.innerHTML = '';
            panier.forEach(article => {
                const item = document.createElement('li');
                item.textContent = `${article.nom} - ${article.prix}€`;
                panierListe.appendChild(item);
            });
            document.getElementById('totalPrix').textContent = `${total}€`;
        }

        function finaliserAchat() {
            if (panier.length > 0) {
                alert(`Votre achat a été finalisé pour un total de ${total}€. Merci de votre commande !`);
                panier = [];
                total = 0;
                afficherPanier();
            } else {
                alert("Votre panier est vide.");
            }
        }
