# Site e-commerce

https://lets-get-magik.onrender.com/

La version mobile n'est pas entièrement optimisée.

## Description

Magik est un site e-commerce construit avec  **Next.js**, **Stripe**, et **Supabase**.  
Il permet à l'administrateur d'ajouter, de modifier ou de supprimer des produits de sa base de données et de 
les afficher sur le site.  
Le client peut ajouter des produits dans son panier et payer avec Stripe.

  

## Fonctionnalités


### 1. Se connecter
Aller sur la page **/login**,rentrer ses identifiants et cliquer sur **Se connecter**.  
**Email : test@test.fr**  
**Mot de passe : test**  
On accède alors à la page **/admin** qui recense tous les produits créés.

### 2. Créer un produit
Cliquer sur le bouton **Ajouter un produit** qui se situe sur la barre latérale gauche.  
Cela ouvre le formulaire d'ajout de produit ; compléter tous les champs et cliquer sur le bouton **Ajouter le produit**.  
Le formulaire se ferme et le produit est bien ajouté dans la liste des produits.

### 3. Modifier un produit
Cliquer sur le bouton **Modifier** de la ligne du produit à modifier.  
Le formulaire s'ouvre avec les champs pré-remplis ; il suffit de modifier les champs souhaités.  
Cliquer sur le bouton **Mettre à jour le produit**.  
Le formulaire se ferme et le produit est bien mis à jour dans la liste des produits.

### 4. Supprimer un produit
Cliquer sur le bouton **Supprimer** de la ligne du produit à modifier.  
Le produit est instantanément supprimé de la liste des produits. 

### 5. Se déconnecter
Cliquer sur le bouton **Déconnexion** qui se situe sur la barre latérale gauche.  
Cela redirige l'utilisateur sur la page **/login**

### 6. Filtrer les produits
Sur la page d'accueil, sélectionner le tag souhaité afin de filtrer les produits par catégorie.  
Il existe 3 catégories de produits : **soin**, **sérum** et **crème**.

### 7. Rechercher les produits 
Sur la nav, cliquer sur la barre de recherche et taper un mot.  
Si ce mot figure dans le titre d'un produit, alors les produits sont filtrés en conséquence.  
Si aucun produit ne contient ce mot, alors aucun produit n'apparait et le message **Aucun produit trouvé** est affiché. 

### 8. Afficher une fiche produit
Cliquer sur le produit à afficher pour être redirigé sur la page **/produit/[id]** 

### 9. Ajouter un produit au panier
Cliquer sur le bouton **Ajouter au panier** les produits souhaités.  
Cela ajoute automatiquement les produits dans le panier.  
Dans la barre de navigation, à côté de l'icône du panier, un compteur indique à l'utilisateur combien de produit 
il a ajouté à son panier. 

### 10. Visualiser son panier
Dans la barre de navigation, cliquer sur l'icône de **panier** située à droite.  
Une barre latérale apparaît avec la liste des produits ajoutés par l'utilisateur. 

### 11. Modifier son panier
L'utilisateur peut supprimer un produit en cliquant sur l'icône de **poubelle** associée au produit à supprimer.  
L'utilisateur peut incrémenter ou décrémenter la valeur d'un même produit.  
La valeur du panier est adaptée. 

### 12. Payer le contenu du panier
Cliquer sur **Payer avec Stripe**.  
L'utilisateur est redirigé sur la page checkout de Stripe.  
Une fois le paiement finalisé, l'utilisateur est regirigé sur la page **/success** où figure un 
récapitulatif des produits qu'ils vient d'acheter.  
**Pour faire un paiement test :**  
Information de la carte : 4242 4242 4242 4242  
CVC : 123



## Installation :

- **Node.js** (version >=16.0.0)
- **npm** ou **yarn**
- **Stripe** : Créer un compte Stripe pour obtenir les clés API.
- **Supabase** : Créer un compte Supabase pour obtenir les informations de connexion à la base de données.

```bash
npm install
npm run dev
npm run build 
npm run start
```

Créer un fichier .env.local à la racine du projet et définir les variables suivantes :  


```jsx
# BASE URL
NEXT_PUBLIC_BASE_URL=  //http://localhost:3000


# STRIPE 
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=


# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=
```

