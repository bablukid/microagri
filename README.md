# MicroAgri

Application de questionnaire en ligne pour recenser les microfermes

http://microagri.org

## Stack
 - Haxe 4 ( compilé en PHP 7 )
 - MySQL 5.5

## Installation

 - Initialiser Docker : `docker-compose up -d`
 - installer les librairies Haxe :
  `lix scope create
  lix use haxe 4.0.0-rc.1
  lix install github:bablukid/sugoi#haxe4
  lix install github:bablukid/spod#master
  lix install github:bablukid/hxtwig
  lix install github:bablukid/hxspout
  lix install haxelib:smtpmailer
  lix install haxelib:jstack
  lix install haxelib:hx3compat
  `
 - Installer les librairies PHP :  `composer install`
 - Compiler : `haxe build.hxml`
 - Aller sur http://localhost:8080


## Troubleshooting

Si rien ne s'affiche dans le navigateur, taper `docker-compose logs` pour inspecter les logs