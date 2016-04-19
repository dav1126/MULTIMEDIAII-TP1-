(function() 
{
    "use strict";
    
    var projets = 
        [
            {
                nom : "Langues",
                dir : "langues"
            },
            {
                nom : "Pens",
                dir : "pens"
            },
            {
                nom : "Youtube",
                dir : "youtube"
            },
            {
                nom : "Tutoriel JS",
                dir : "tutorielJS"
            },
            {
                nom: "Todo",
                dir: "todo"
            }
        ];
    
    initMenu();
    
    sourdineLabel.title = "Activer sourdine";
    
    if (localStorage.sourdineCheck === "oui")
    {
        audioMsg.pause();
        sourdineCheckbox.checked = true;
        sourdineLabel.title = "Désactiver sourdine";
    }
    
    sourdineCheckbox.addEventListener("change", manageCheckbox);
    
    function manageCheckbox()
    {
        if (sourdineCheckbox.checked)
        {
            audioMsg.pause();
            sourdineLabel.title = "Désactiver sourdine";
            localStorage.sourdineCheck = "oui";
        }
        else
        {
            audioMsg.load();
            sourdineLabel.title = "Activer sourdine";
            localStorage.sourdineCheck = "non";
        }
    }
    
    function initMenu()
    {
        let menuDiv = document.querySelector("ul");
        for (var elem of projets)
            {
                let liste = document.createElement("li");
                let link = document.createElement("a");
                link.setAttribute("href", "../" + elem['dir'] + "/index.html");
                let text = document.createTextNode(elem['nom']);
                liste.appendChild(link);
                link.appendChild(text);
                menuDiv.appendChild(liste);
            }
    }
    
}) ();