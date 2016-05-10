(function() 
{
    "use strict";
    //Generation du menu des projets avec un template HandleBars
        var templateScript = $("#template-projets").html();
        var template = Handlebars.compile(templateScript);
        jQuery.getJSON("../../projets.json")
            .done(function(jsonData){
                console.log(JSON.stringify(jsonData, null, 4));
                var compiledHtml = template({projets: jsonData});
                $(document).find("ul").append(compiledHtml);

                var skinSpans = document.querySelectorAll(".skin");
                skinSpans[0].classList.add("skin-red");
                skinSpans[1].classList.add("skin-orange");
                skinSpans[2].classList.add("skin-camo");
            })
            .fail(function()
            {
                console.log("Impossible de charger le JSON");
            });

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