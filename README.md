
** Lien vers repositoire GitHUB ** 



** Lien vers la branch dev ** 



** Pour récuperer la dernière version de dev ** 

git pull origin dev

** Pour créer une branche ** 

git checkout -b "Nomdelabranche"

** Pour faire un commit et push ta branche **
 git add . 
 git commit -m "Message" 
 git push origin Nomdelabranche

** Pour merge la branche dans le dev **

** Faire un dernier commit push de la branche ** 
git checkout dev -f 
git merge Nomdelabranche 
git push origin dev

** Pour switcher la branche ** 
git checkout Nomdelabranche -f