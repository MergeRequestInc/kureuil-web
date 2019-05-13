# run kureuil-web with Docker

#Créer le conteneur Docker

Dans le dossier où se trouve le fichier Dockerfile, lancer la commande :
```
docker build -t kureuil-web .
```
#Lancer le conteneur Docker
Lancer la commande :
```
docker run --network="host" kureuil-web
```
#Stopper le conteneur Docker

Trouver le nom du conteneur à arreté avec la commande :
```
docker container ps
```

Lancer la commande:
```
docker stop nom_du_conterneur
```

#Commandes utiles

-Lister tout les conteneurs docker => 	docker container ps -a
-Créer un conteneur sans le cache =>	docker build --no-cache -t kureuil-web .




