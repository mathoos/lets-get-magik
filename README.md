# Site e-commerce

https://task-manager-journal.onrender.com/

L'application ne possède pas encore de version mobile.



## Description

Magik est un site e-commerce construit avec  **Next.js**, **Stripe**, et **Supabase**.####
Il permet à l'administrateur d'ajouter, de modifier ou de supprimer des produits de sa base de données et de 
les afficher sur le site.####
Le client peut ajouter des produits dans son panier et payer avec Stripe.

  

## Fonctionnalités


### 1. Se connecter
Aller sur la page **/login** et rentrer ses identifiants et cliquer sur **Se connecter**.####
**Email : test@test.fr**####
**Mot de passe : test**####
On accède alors à la page **/admin** qui rencense tous les produits créés.

### 2. Créer un produit
Cliquer sur le bouton **Ajouter un produit** qui se situe sur la barre latérale gauche.####
Cela ouvre le formulaire d'ajout de produit ; compléter tous les champs et cliquer sur le bouton **Ajouter le produit**.#### 
Le formulaire se ferme et le produit est bien ajouté dans la liste des produits.

### 3. Modifier un produit
Cliquer sur le bouton **Modifier** de la ligne du produit à modifier.#### 
Le formulaire s'ouvre avec les champs pré-remplis ; il suffit de modifier les champs souhaités.####
Cliquer sur le bouton **Mettre à jour le produit**.####
Le formulaire se ferme et le produit est bien mis à jour dans la liste des produits.

### 4. Supprimer un produit
Cliquer sur le bouton **Supprimer** de la ligne du produit à modifier.####
Le produit est instantanément supprimé de la liste des produits. 

### 5. Se déconnecter
Cliquer sur le bouton **Déconnexion** qui se situe sur la barre latérale gauche.####
Cela redirige l'utilisateur sur la page **/login**

### 6. Filtrer les produits
Sur la page d'accueil, sélectionner le tag souhaité afin de filtrer les produits par catégorie.#### 
Il existe 3 catégories de produits : **soin**, **sérum** et **crème**.

### 7. Rechercher les produits 
Sur la nav, cliquer sur la barre de recherche et taper un mot.####
Si ce mot figure dans le titre d'un produit, alors les produits sont filtrés en conséquence.####
Si aucun produit ne contient ce mot, alors aucun produit n'apparait et le message **Aucun produit trouvé** est affiché. 

### 8. Afficher une fiche produit
Cliquer sur le produit à afficher pour être redirigé sur la page **/produit/[id]** 

### 9. Ajouter un produit au panier
Cliquer sur le bouton **Ajouter au panier** les produits souhaités.####
Cela ajoute automatiquement les produits dans le panier.####
Dans la barre de navigation, à côté de l'icône du panier, un compteur indique à l'utilisateur combien de produit 
il a ajouté à son panier. 

### 10. Visualiser son panier
Dans la barre de navigation, cliquer sur l'icône de **panier** située à droite.#### 
Une barre latérale apparaît avec la liste des produits ajoutés par l'utilisateur. 

### 11. Modifier son panier
L'utilisateur peut supprimer un produit en cliquant sur l'icône de **poubelle** associée au produit à supprimer.#### 
L'utilisateur peut incrémenter ou décrémenter la valeur d'un même produit.####
La valeur du panier est adaptée. 

### 12. Payer le contenu du panier
Cliquer sur **Payer avec Stripe**.#### 
L'utilisateur est redirigé sur la page checkout de Stripe.#### 
Une fois le paiement finalisé, l'utilisateur est regirigé sur la page **/success** où figure un 
récapitulatif des produits qu'ils vient d'acheter.#### 
**Pour faire un paiement test**#### 
Information de la carte : 4242 4242 4242 4242#### 
CVC : 123



## Prérequis :
[![NPM](https://img.shields.io/npm/v/wealth-health-modal-lib.svg)](https://www.npmjs.com/package/wealth-health-modal-lib) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
- **Node.js** (version >=16.0.0)
- **npm** ou **yarn** (npm est livré avec Node.js)
- **Stripe** : Créez un compte Stripe pour obtenir vos clés API.
- **Supabase** : Créez un compte Supabase et obtenez les informations de connexion pour votre base de données.



## Pistes d'amélioration

### - Possibilité d'ajouter des images ou fichiers dans les notes.
### - Possibilité de marquer quand une tâche a été effectuée. 
### - Créer une page avec les tâches archivées.













This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## admin identification

email : test@test.fr
mot de passe : test

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
