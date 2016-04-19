(function() 
 {
    "use strict";
    var monTitre = document.querySelector('h1');
    monTitre.textContent = 'Mozilla est cool';

    var monImage = document.querySelector('img');

    monImage.onclick = function()
    {
        var maSrc = monImage.getAttribute('src');
        if (maSrc === 'images/firefox-icon.png')
        {
            monImage.setAttribute ('src', 'images/firefox.png');
        }
        else
        {
            monImage.setAttribute('src', 'images/firefox-icon.png');    
        }
    }

    var monBouton = document.querySelector('button');
    var monTitre = document.querySelector('h1');

    function definirNomUtilisateur()
    {
        var monNom = prompt('Veuillez saisir votre nom.');
        if (monNom === "")
        {
            monTitre.textContent = 'Mozilla est cool, Inconnu';
        }
        else if (monNom)
        {        
            localStorage.setItem('nom', monNom.trim());
            monTitre.textContent = 'Mozilla est cool, ' +monNom;
        }
        else
        {
            monTitre.textContent = 'Mozilla est cool, Inconnu';
        }
    }

    if (!localStorage.getItem('nom'))
    {
        definirNomUtilisateur();
    }
    else
    {
        var nomEnregistre = localStorage.getItem('nom');
        monTitre.textContent = 'Mozilla est cool, ' +nomEnregistre;
    }

    monBouton.onclick = function()
    {
        definirNomUtilisateur();
    }
} )();