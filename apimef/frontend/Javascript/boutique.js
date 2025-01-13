let panier = [];
        let total = 0;

        function ajouterAuPanier(nom, prix) {
            panier.push({ nom: nom, prix: prix });
            total += prix;
            afficherPanier();
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
