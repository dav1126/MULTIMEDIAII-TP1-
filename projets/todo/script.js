(function() 
{
    "use strict";
    var articles = 
    [
        "Laver la vaiselle",
        "Passer l'aspirateur",
        "Finir le TP de multimedia"
    ];
    
    
    for (let elem of articles)
    {
      ajouterTodo(elem); 
    }
    
    let inputField = document.querySelector("input");
    inputField.onkeypress = function(e)
    {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13')
            {
              if (inputField.value.trim() !== "")
                ajouterTacheTodo(inputField.value.trim());
                inputField.value = "";
            }
    }
    
    function ajouterTacheTodo(inputText)
    {
        let article = document.createElement("article");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkbox");
        let division = document.createElement("div");
        division.setAttribute("class", "text");
        division.setAttribute("tabIndex", "0");
        division.setAttribute("contenteditable", "contenteditable");
        let texte = document.createTextNode(inputText);
        division.appendChild(texte);
        let image = document.createElement("img");
        image.setAttribute("src", "../../img/delete.png");
        image.setAttribute("alt", "delete");
        image.setAttribute("tabIndex", "0");
        article.appendChild(checkbox);
        article.appendChild(division);
        article.appendChild(image);
        todolist.insertBefore(article, todolist.firstChild);
        
        article.querySelector("img").onclick = deleteArticle;
        article.querySelector("img").onkeypress = deleteArticleWithEnter; 
        article.querySelector(".text").onkeypress = getFocusOnInpuField;
    }
    
    function ajouterTodo(todoTexte)
    {
        let article = document.createElement("article");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkbox");
        let division = document.createElement("div");
        division.setAttribute("class", "text");
        division.setAttribute("tabIndex", "0");
        division.setAttribute("contenteditable", "true");
        let texte = document.createTextNode(todoTexte);
        division.appendChild(texte);
        let image = document.createElement("img");
        image.setAttribute("src", "../../img/delete.png");
        image.setAttribute("alt", "delete");
        image.setAttribute("tabIndex", "0");
        article.appendChild(checkbox);
        article.appendChild(division);
        article.appendChild(image);
        todolist.appendChild(article);
        
        article.querySelector("img").onclick = deleteArticle; 
        article.querySelector("img").onkeypress = deleteArticleWithEnter;
        article.querySelector(".text").onkeypress = getFocusOnInpuField;
    }
    
    function getFocusOnInpuField(e)
    {
       if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13')
                {
                    input.focus();
                } 
    }
    
    function deleteArticleWithEnter(e)
    {
        if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13')
                {
                    this.parentNode.outerHTML="";  
                } 
    }
    
    function deleteArticle()
    {     
         this.parentNode.outerHTML="";
    }
    
//    function 
    
}) ();