/* Afficher les produits */
(async function() {
    const products = await getProducts();
    for (product of products) {
        createCards(product);
    };
})();

/* Appele les données de l'API du serveur */
function getProducts() {
    const URL = "http://localhost:3000/api/cameras";
    return fetch(URL)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json();
        })
        .catch(function(error) {
            showErrorMessage();
        })
};

/* Créer des cartes produits */
function createCards(product) {
    const templateElement = document.getElementById("templateProducts");
    const cloneElement = document.importNode(templateElement.content, true);
    
    cloneElement.getElementById("card__image").src = product.imageUrl;
    cloneElement.getElementById("card__name").textContent = product.name;
    cloneElement.getElementById("card__price").textContent = (product.price / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"});
    cloneElement.getElementById("card__link").href = "pages/produit.html?id=" + product._id;
    
    document.getElementById("cards").appendChild(cloneElement);
};
