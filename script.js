class Fact {
    constructor(text) {
        this.text = text;
    }

    getFact() {
        return `
        <tr>
            <td>${this.text}</td>
        </tr>
        `;
    }
}

class Evidence {
    constructor() {
        this.likes = [];
        this.dislikes = [];
    }

    addToLikes(fact) {
        this.likes.push(fact);
    }

    addToDislikes(fact) {
        this.dislikes.push(fact);
    }

    check(fact) {
        this.likes.forEach(facticek => {
            if (facticek.text == fact.text) {
                return true;
            }
        });

        this.dislikes.forEach(facticek => {
            if (facticek.text == fact.text) {
                return true;
            }
        });
    }

}

var currentFact;

function getFromWeb() {
    $.ajax({
        url: "https://dog-api.kinduff.com/api/facts?number=1",
        dataType: "json",
        success: function (data) {
            $("#generate").hide();
            $("#fact").text(data.facts)
            $("#card").slideDown();
            var f = new Fact(data.facts);
            currentFact = f.text;
        },
        error: function () { // error callback 
            alert('Error with connection to website');
        }
    });
}

function getAnother() {
    $.ajax({
        url: "https://dog-api.kinduff.com/api/facts?number=1",
        dataType: "json",
        success: function (data) {
            $("#card").fadeOut(200);
            setTimeout(function () {
                $("#card").slideDown();
                $("#fact").text(data.facts);
            }, 500);
            var f = new Fact(data.facts);
            currentFact = f.text;
        },
        error: function () { // error callback 
            alert('Error with connection to website');
        }
    });
}


let html;

$(document).ready(function () {

    var evidence = new Evidence();

    $("#generate").click(function () {
        getFromWeb();
    });

    $("#generateAnother").click(function () {
        getAnother();
    });

    $("#like").click(function () {
        evidence.addToLikes(currentFact);
        $("#printLikes").show();
        getAnother();
        AddToTableLikes();

    });

    $("#dislike").click(function () {
        evidence.addToDislikes(currentFact);
        $("#printDislikes").show();
        getAnother();
        AddToTableDislikes();
    });

    $("#printLikes").click(function () {
        $("#table-like").show();
        
    });


    $("#printDislikes").click(function () {
        $("#table-dislike").show();
        
    });
});



function AddToTableLikes() {
    html += `<tr><td>${currentFact}</td ></tr >`;
    document.getElementById("table-like").innerHTML = html;
    
}


function AddToTableDislikes() {
    html += `<tr><td>${currentFact}</td ></tr >`;
    document.getElementById("table-dislike").innerHTML = html;

}


