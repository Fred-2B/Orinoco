# Orinoco

<p>Orinoco, une entreprise de commerce en ligne.</p>
<p>Son credo ? Se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits</p>

<h2>Architecture générale</h2>

<p>L’application web sera composée de 4 pages :</p>

<p>● une page de vue sous forme de liste, montrant tous les articles disponibles
à la vente ;</p>
<p>● une page “produit”, qui affiche de manière dynamique l'élément
sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
l'ajouter à son panier ;</p>
<p>● une page “panier” contenant un résumé des produits dans le panier, le prix
total et un formulaire permettant de passer une commande. Les données
du formulaire doivent être correctes et bien formatées avant d'être
renvoyées au back-end. Par exemple, pas de texte dans les champs date ;</p>
<p>● une page de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant le prix total et l'identifiant de commande envoyé
par le serveur.</p>

<h2>Produits présentés</h2>

<p>Dans un premier temps, une seule catégorie de produits sera présentée.</p>
<p>Choix à faire entre les 3 propositions suivantes :</p>
<p>● ours en peluche faits à la main ;</p>
<p>● caméras vintage ;</p>
<p>● meubles en chêne.</p>

<h2>Planification de tests unitaires</h2>

<p>Planifiez une suite de tests unitaires pour couvrir au minimum 80 % de la base de
code pour le front-end.</p>
<p>Vous devrez formaliser un plan pour atteindre ce résultat,
sans obligation d’écrire ces tests.</p>
<p>Expliquez quelles lignes seront testées, et quels
“test cases” seront envisagés.</p>

<h2>Validation des données</h2>

<p>Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
firstName, lastName, address, city et email.</p>
<p>Le tableau des produits envoyé au
backend doit être un array de strings products.</p>
<p>Les types de ces champs et leur
présence doivent être validés avant l’envoi des données au serveur.</p>