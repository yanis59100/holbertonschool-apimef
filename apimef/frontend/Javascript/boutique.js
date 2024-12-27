let panier = [];
        let total = 0;

        // Fonction pour ajouter un article au panier
        function ajouterAuPanier(nom, prix) {
            panier.push({ nom: nom, prix: prix });
            total += prix;
            afficherPanier();
        }

        // Fonction pour afficher les articles du panier et le total
        function afficherPanier() {
            const panierListe = document.getElementById('panierListe');
            panierListe.innerHTML = ''; // Vide la liste avant de la remplir
            panier.forEach(article => {
                const item = document.createElement('li');
                item.textContent = `${article.nom} - ${article.prix}€`;
                panierListe.appendChild(item);
            });
            document.getElementById('totalPrix').textContent = `${total}€`;
        }

        // Fonction pour finaliser l'achat
        function finaliserAchat() {
            if (panier.length > 0) {
                alert(`Votre achat a été finalisé pour un total de ${total}€. Merci de votre commande !`);
                panier = []; // Vide le panier après l'achat
                total = 0;
                afficherPanier();
            } else {
                alert("Votre panier est vide.");
            }
        }
