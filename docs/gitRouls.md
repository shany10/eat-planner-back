Voici quelque bonne pratique git qu'il faut respecter


***************************************************************************

Pour les noms des branches :

# Branche destiner pour la creation de fonctionnalité, composant, etc

feature/[nom_de_la_fonctionnalité]

# Branche destiner à la debogage 

fix/[nom_de_la_fonctionnalité_à_deboguer]


Astuce! :

# Si vous avez mal nommer votre branche vous pouver la modifier 

git branch -m ancien-nom nouveau-nom


***************************************************************************

Pour les commits :

# Message de commit 

git commit -m "nom_de_votre_branche : les modification que vous avez apporté"
