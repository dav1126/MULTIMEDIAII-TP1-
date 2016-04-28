(function()
{
    "use strict";

    var pensIdList =
    [
        "NNXvGe",
        "dMJyjO",
        "vGWoWa",
        "dMWraw",
        "ZWKJrq"
    ]

    var template=document.querySelector(".flexBox").firstElementChild;
    document.querySelector(".flexBox").innerHTML = "";
    for (let i=0; i<pensIdList.length; i++)
    {
        var clone = template.cloneNode(true);
        clone.querySelector("p").setAttribute("data-slug-hash", pensIdList[i]);
        document.querySelector(".flexBox").appendChild(clone);
    }
}) ();