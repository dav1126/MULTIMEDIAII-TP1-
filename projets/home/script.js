(function() 
{
    "use strict";
    //Generation du menu des projets avec un template HandleBars
        var templateScript = $("#template-projets").html();
        var template = Handlebars.compile(templateScript);
        var context =
        {
            projets: [
                {
                    nom: "Langues",
                    dir: "langues",
                    description: "Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3",
                    sujets: ["CSS3", "HTML5", "Sélecteurs"]
                },
                {
                    nom: "Pens",
                    dir: "pens",
                    description: "Exercices que j'ai fait avec CodePen",
                    sujets: ["CSS3", "HTML5", "CodePen"]
                },
                {
                    nom: "Youtube",
                    dir: "youtube"
                },
                {
                    nom: "Tutoriel JS",
                    dir: "tutorielJS"
                },
                {
                    nom: "Todo",
                    dir: "todo",
                    description: "Liste dynamique de choses à faire",
                    sujets: ["CSS3", "HTML5", "JavaScript"]
                }
            ]
        }
        var compiledHtml = template(context);
        $(document).find("ul").append(compiledHtml);

    //Generation des description des projets avec un template HandleBars
        

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
}) ();