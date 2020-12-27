# Timemanager

Projet Timemanager - Piscine MSC1

## Docker
Pour lancer le Docker:



```bash
# Depuis la racine
docker-compose up --build
```
Back: localhost:4000

Front: localhost:8080

BDD: localhost:5432

Note: Le docker actuel n'est pas prévu pour avoir un hot reload pour VueJS, c'est à dire qu'il n'y aura pas de recompilation pendant le dev, il faut donc lancer le docker + lancer le front à la main via les commandes:

```bash
# Depuis le dossier "theme02"
npm i
npm run serve
```
Ce point risque de changer mais pour l'instant ça fonctionne comme ça.

En cas de pb avec les variables d'environnement "HOST" ( cc Windows 10 Home docker ), les variables d'environnement sont dans le docker-compose.yml, vous pouvez directement les changer pour pouvoir pointer directement sur les IP qu'il vous faut.
- PGHOST
- VUE_APP_API_HOST

Pour vue si vous lancez en local, tout est dans le fichier /theme02/.env
```
#Exemple avec le service api du docker compose
environment:
        PGUSER: PGUSER
        PGPASSWORD: PGPASSWORD
        PGDATABASE: PGDATABASE
        PGPORT: PGPORT
        PGHOST: PGHOST # <---C'est de ce genre là
```

### MOBILE

Pour le mobile :
```
# depuis le theme02

npm run cordova-prepare # prepare for build (you can run this command, when you checkouted your project from GIT, it's like npm install)
npm run cordova-serve-android # Development Android 
npm run cordova-build-android # Build Android 
npm run cordova-build-only-www-android # Build only files to src-cordova 
```

Plus d'info sur le github de [vue-cli-plugin-cordova](https://www.npmjs.com/package/vue-cli-plugin-cordova)



## Deploiement
Ce projet est directement déployé sur Azure.
Actuellement configuré pour deploy à chaque push, le front est disponible via le lien:

[http://timemanager-vue.francecentral.azurecontainer.io:8080/](http://timemanager-vue.francecentral.azurecontainer.io:8080/)

Vous pouvez voir l'avancement de vos build via le lien [actions](https://github.com/ilayerz/TimeManager/actions)
