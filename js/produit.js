
const productImage = document.getElementById('description__image');
const productName = document.getElementById('description__name');
const productIdentification = document.getElementById('description__id');
const productDescription = document.getElementById('description__description');
const productPrice = document.getElementById('description__price');
const productOption = document.getElementById('description__option');
const productQuantity = document.getElementById('description__quantity');


/* Afficher les données d'un produit */
(async function() {
    const productId = getProductId();
    const productInfo = await getProductInfo(productId);
    insertProductInfo(productInfo);
    ready(productInfo);
})();

/* Obtenir l'ID du produit de l'URL*/
function getProductId() {
    return new URL(document.location).searchParams.get('id');
};

/* Appeler les données par ID de l'API du serveur  */
function getProductInfo(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then((responseHttp) => responseHttp.json())
        .catch(function(error) {
            showErrorMessage()
        });
};


/* Insérer les données */
function insertProductInfo(productInfo) {
    productImage.src = productInfo.imageUrl;
    productName.textContent = productInfo.name;
    productIdentification.textContent = `Réf :  ` + productInfo._id;
    productDescription.textContent = productInfo.description;
    productPrice.textContent = (productInfo.price / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"});

    for (let i = 0; i < productInfo.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = productInfo.lenses[i];
        productOption.appendChild(option);
    };
};


/* Afficher le nombre d'article(s) ajouté(s) au panier */ 
onLoadCartNumbers();

/* AJOUTER L'ARTICLE CHOISI AU PANIER */

/* Gestion du Local Storage */
let productInCart = localStorage.getItem('Cart')
// Si 'Cart' est vide, créer un array 
if (productInCart === null) {
    productInCart = [];
} 
// Si 'Cart' n'est pas vide, parser JSON 
else {
    productInCart = JSON.parse(productInCart);
}

/* Ajouter au Panier */
function ready(productInfo){
let cartButton = document.querySelector('.card__button');
cartButton.addEventListener('click', () => {
    modifyCartNumbers(); // Local Storage - QuantityInCart
    addToCart(productInfo); // Local Storage - Cart
    addUpTotalPrice(productInfo); // Local Storage - TotalPrice
})
}

/* Augmenter le nombre de 'QuantityInCart' du Local Storage en fonction de 'quantityInput' et afficher la valeur finale sur l'icône de Nav */
function modifyCartNumbers() {
    let productNumbers = localStorage.getItem('QuantityInCart');
    productNumbers = parseInt(productNumbers); // Number
    let quantityInput = document.getElementById('description__quantity').value;
    quantityInput = parseInt(quantityInput); //  Number
    if (productNumbers) {
        localStorage.setItem('QuantityInCart', productNumbers + quantityInput);
    } else {
        localStorage.setItem('QuantityInCart', quantityInput);   
    }
}

/* Mettre à jour la saisie du client dans le 'Cart' du Local Storage */
function addToCart(productInfo) {
    let inputQuantity = productQuantity.value;
    inputQuantity = parseInt(inputQuantity)
    let inputLenses = productOption.value;
    let inputIdenfication = getProductId();
    let product = productInCart.find(
        (obj) => obj.id === inputIdenfication && obj.option === inputLenses
    );
    // Le même produit de même option déjà dans le panier - Incrementer la quantité 

    if (product) {
        product.quantity += parseInt(inputQuantity);
    } 
    // Le même produit mais option différente - Ajouter un nouveau array
    // Produit complétement différent - Ajouter un nouveau array
    else {
       // console.log(productInfo.price / 100)
        productInCart.push({
            image: productInfo.imageUrl,
            id: inputIdenfication,
            name: productInfo.name,
            option: inputLenses,
            quantity: parseInt(inputQuantity),
            price: productInfo.price / 100
        });
    }
    alert('Votre produit va être ajouté au panier !');
    localStorage.setItem('Cart', JSON.stringify(productInCart));
    window.location.reload();
}


/* Calculer le prix total */
function addUpTotalPrice(productInfo) {
    let cartPrice = localStorage.getItem('TotalPrice');
    let inputQuantity = productQuantity.value;
    inputQuantity = parseInt(inputQuantity);
    let inputPriceXQuantity = (productInfo.price / 100) * inputQuantity;
    if (cartPrice !== null) {
        cartPrice = parseInt(cartPrice);
        localStorage.setItem('TotalPrice', cartPrice + inputPriceXQuantity);
    } else {
        localStorage.setItem('TotalPrice', inputPriceXQuantity);
    }
}