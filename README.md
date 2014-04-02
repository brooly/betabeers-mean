betabeers-mean
====================

Material de la charla Fullstack Javascript organizada para Betabeers Zaragoza

## Requisitos
Instalar [mongodb](http://docs.mongodb.org/manual/installation/)
Instalar [node](http://nodejs.org/)
Instalar [npm](https://www.npmjs.org/)  
Instalar [bower](http://bower.io):
  npm install -g bower
Instalar [grunt](http://gruntjs.com/):
  npm install -g grunt-cli

## Importar datos de ejemplo
mongoimport --db betabeers --collection busstops --type json --file bus.json

## Puesta en marcha
  npm install
  bower install
  grunt serve
