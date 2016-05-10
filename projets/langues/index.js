(function()
{
    "use strict";
    var pAreDown = true;
    var buttonsAreShown = false;
    document.querySelector("iframe").onload = manageIFrameHeight;
    window.onresize=manageHeightChange;
    document.querySelectorAll("button")[0].onclick = basculerIframe;
    document.querySelectorAll("button")[1].onclick = basculerPara;
    document.querySelectorAll("button")[2].onclick = toggleButtons;

    document.body.onload = insertButtons;

    function manageIFrameHeight() {
        this.style.height = this.contentDocument.body.scrollHeight + 350 + 'px';
    }

    function manageHeightChange()
    {
        document.querySelector("iframe").style.height = "initial";
        document.querySelector("iframe").style.height = document.querySelector("iframe").contentDocument.body.scrollHeight + 100 + 'px';
    }

    function basculerIframe()
    {
        $("iframe:first").fadeToggle("slow", "linear");
    }

    function basculerPara()
    {
        var iframeRoot = document.querySelector("iframe").contentDocument;
        var $p = $('p', iframeRoot);
        if (pAreDown) {
            $p.slideUp(1000, "swing");
            pAreDown = false;
        }
        else
        {
            $p.slideDown(1000, "swing");
            pAreDown = true;
        }
    }

    function toggleButtons()
    {
        var iframeRoot = document.querySelector("iframe").contentDocument;
        var $article = $('article', iframeRoot);
        if (buttonsAreShown) {
            $article.find('button').fadeToggle('slow', "linear");
            buttonsAreShown = false;
        }
        else {
            $article.find('button').fadeToggle('slow', "linear");
            buttonsAreShown = true;
        }
    }

    function insertButtons()
    {
        //Create and insert the buttons
        var iframeRoot = document.querySelector("iframe").contentDocument;
        var $article = $('article', iframeRoot);
        var $button = $('<button>Basculer affichage</button>');
        $button.css('position', 'absolute');
        $button.css('top', '10px');
        $button.css('right', '10px');
        $button.css('opacity', '0.75');
        $button.css('border-radius', '5px');
        $button.css('font-weight', 'bold');
        $button.css('width', '25%');
        $button.onclick =
        $article.prepend($button);

        //Hide the buttons
        var iframeRoot = document.querySelector("iframe").contentDocument;
        var $article = $('article', iframeRoot);
        $article.find('button').hide();

        //Set these buttons an events handlers, youknowwhatimean?
        setButtonsEventsHandler();
    }

    function setButtonsEventsHandler()
    {
        var iframeRoot = document.querySelector("iframe").contentDocument;
        var $article = $('article', iframeRoot);

        //Onclick
        $article.find('button').on('click', hideVignetteContent);

        //Hover
        $article.find('button').hover(function()
        {
            $(this).stop();
            $(this).animate({opacity: '1'});
            $(this).css('color', 'red');
        },
        function()
        {
            $(this).stop();
            $(this).animate({opacity: '0.75'}, function(){
                $(this).css('color', 'black');
            })
        }
        );
    }

    function hideVignetteContent()
    {
        $(this).parent().find('p').fadeToggle('slow', 'linear');
        $(this).parent().find('ol').fadeToggle('slow', 'linear');
    }

}) ();

