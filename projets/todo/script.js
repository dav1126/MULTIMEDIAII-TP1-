(function() 
{
    "use strict";
    
    var articlesTodo;
    var articlesDone;
    if (localStorage.todolist && localStorage.todolist !== "undefined")
    {
        articlesTodo = JSON.parse(localStorage.todolist);
        for (let elem of articlesTodo)
        {
          ajouterTodo(elem); 
        }
    }
    if (localStorage.donelist && localStorage.donelist !== "undefined")
    {
        articlesDone = JSON.parse(localStorage.donelist);
        for (let elem of articlesDone)
        {
          let checkbox = ajouterTodo(elem);
          checkbox.click();
        }
    }
    
    if (localStorage.inputText && localStorage.inputText !== "undefined")
    {
        input.value = localStorage.inputText;
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
                localStorage.inputText = undefined;
            }
    }
    
    manageButtonDisable();
    allDoneButton.onclick = makeAllTasksDone;
    deleteDoneButton.onclick = deleteDoneTasks;
    input.onblur = saveInputText;        
    
    function ajouterTacheTodo(inputText)
    {
        let article = document.createElement("article");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkbox");
        let division = document.createElement("div");
        division.setAttribute("class", "text");
        division.setAttribute("tabIndex", "0");
        division.setAttribute("contenteditable", "true");
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
        checkbox.onkeypress = checkThatCheckBox;
        checkbox.onclick = addToDoneList;
        article.querySelector("div").onkeypress = focusNextElement;
        article.querySelector(".text").onblur = saveUpdatedTasks;
        manageButtonDisable();
        saveUpdatedTasks();
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
        checkbox.onkeypress = checkThatCheckBox;
        checkbox.onclick = addToDoneList;
        article.querySelector("div").onkeypress = focusNextElement;
        article.querySelector(".text").onblur = saveUpdatedTasks;
        manageButtonDisable();
        return checkbox;
    }
    
    function checkThatCheckBox(e)
    {
       if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13')
                {
                    this.click();
                }  
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
            if (keyCode == '13' || keyCode == '32')
                {
                    focusNextOrPreviousDeleteImg(this);
                    this.click();
                } 
    }
    
    function deleteArticle()
    {     
         this.parentNode.outerHTML="";
         manageButtonDisable();
         saveUpdatedTasks();
    }
    
    function manageButtonDisable()
    {
        allDoneButton.disabled = false;
        deleteDoneButton.disabled = false;
        
        if (!todolist.hasChildNodes() && !donelist.hasChildNodes())
         {
             allDoneButton.disabled = true;
             deleteDoneButton.disabled = true;
         }     
        else if (!todolist.hasChildNodes())
        {
             allDoneButton.disabled = true;
        }
        else if (!donelist.hasChildNodes())
        {
            deleteDoneButton.disabled = true;
        }
    }
    
    function addToDoneList()
    {
      let article = this.parentNode;
      let checkbox = this;    
      article.outerHTML="";    
      donelist.insertBefore(article, donelist.firstChild);
      checkbox.focus();
      checkbox.onclick = (function()
      {
          ajouterTodo(article.querySelector("div").innerText);
          checkbox.parentNode.outerHTML="";
          todolist.lastChild.querySelector("input").focus();
          manageButtonDisable();
          saveUpdatedTasks();
      })
      ; 
      manageButtonDisable();
      saveUpdatedTasks();
    }
    
    function makeAllTasksDone()
    {
        while (todolist.hasChildNodes())
        {
            todolist.firstChild.querySelector("input").click();
        }
    }
    
    function deleteDoneTasks()
    {
       while (donelist.hasChildNodes())
        {
            donelist.firstChild.querySelector("img").click();
        } 
    }
    
    function saveUpdatedTasks()
    {
        articlesTodo = [];
        articlesDone = [];
        
        let todoArticles = todolist.querySelectorAll("article");
        
        for (let i=0; i<todoArticles.length; i++)
        {
            let task = todoArticles[i].querySelector(".text").innerText;
            articlesTodo.push(task);
        }
        
        let doneArticles = donelist.querySelectorAll("article");
        for (let i=0; i<doneArticles.length; i++)
        {
            let task = doneArticles[i].querySelector(".text").innerText;
            articlesDone.unshift(task);
        }
 
        localStorage.todolist = JSON.stringify(articlesTodo);
        localStorage.donelist = JSON.stringify(articlesDone);
    }
    
    function saveInputText()
    {
        localStorage.inputText = input.value;
    }
    
    function focusNextElement(e)
    {
        if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13')
            {
                e.preventDefault();
                if (this.parentNode.nextElementSibling !== null)
                    this.parentNode.nextElementSibling.childNodes[1].focus();
                
                else if (this.parentNode.parentNode.nextElementSibling !== null)
                    {
                       if (this.parentNode.parentNode.nextElementSibling.firstChild != null)        this.parentNode.parentNode.nextElementSibling.firstChild.childNodes[1].focus();
                    }
                
                else
                    input.focus();
            }   
    }
    
    function focusNextOrPreviousDeleteImg(element)
    {
       if (element.parentNode.nextElementSibling !== null)
            element.parentNode.nextElementSibling.childNodes[2].focus();
                
        else if (element.parentNode.parentNode.nextElementSibling !== null && element.parentNode.parentNode.nextElementSibling.firstChild != null)
        {
          element.parentNode.parentNode.nextElementSibling.firstChild.childNodes[2].focus();
        }
        else if (element.parentNode.previousElementSibling !== null)
            element.parentNode.previousElementSibling.childNodes[2].focus();
        else if (element.parentNode.parentNode.previousElementSibling != null && element.parentNode.parentNode.previousElementSibling.getAttribute("id") == "todolist" && element.parentNode.parentNode.previousElementSibling.firstChild != null)
        {
          element.parentNode.parentNode.previousElementSibling.lastChild.childNodes[2].focus();
        }
        else
            input.focus(); 
    }
    
    document.querySelector("a").focus();
    
}) ();