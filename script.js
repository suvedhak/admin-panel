var url = 'https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

$(document).ready(function() {

    $(window).on("load", function() {
        $("#overlay").fadeOut(500);

    });

$.get(url, function(data) {

// console.log(data);

class User {

    constructor(userData) {
        this.idnum = userData.id;
        this.fname = userData.firstName;
        this.lname = userData.lastName;
        this.email = userData.email;
        this.phone = userData.phone;
        this.description = userData.description;
        this.address = userData.address.streetAddress;
        this.city = userData.address.city;
        this.state = userData.address.state;
        this.zip = userData.address.zip;

    }
    printUserCards() {
       return(`<tr id="id-${this.idnum}" class="data-row">
       <td class="column1">${this.idnum}</td>
       <td class="column2">${this.fname}</td>
       <td class="column3">${this.lname}</td>
       <td class="column4">${this.email}</td>
       <td class="column5">${this.phone}</td>
       </tr>`);
    }
    printUserDetails() {

        return(`<h1>Details</h1>
        <p>Click on a table item to get detailed information</p>
        <div id="info-content">
            <div><b>User selected:</b> ${this.fname} ${this.lname}</div>
            <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readonly>
                ${this.description}
                </textarea>
            </div>
            <div><b>Address:</b> ${this.address}</div>
            <div><b>City:</b> ${this.city}</div>
            <div><b>State:</b> ${this.state}</div>
            <div><b>Zip:</b> ${this.zip}</div>
        </div>
`);

    }
}

const userCards = $('#user-cards');
const searchText = $("#search-box");
let generateUser = [];
let htmlDetail = [];
let htmlstr = " ";
let detail = [];

// Card Detail Function

function createDetails(detaildata) {

    detail = [];
    for(let x = 0; x < detaildata.length; x++) {

        detail [x] = $(`#id-${generateUser[x].idnum}`).click(function() {

            $('#info-wrapper').html(htmlDetail[x]);

            $("#info-content").css("display", "block");

            $(".data-row").removeClass("active");
            $(`#id-${generateUser[x].idnum}`).addClass("active");

        });

    };
    return(detail);
}


// Create User Cards Function


function createCards(apidata) {

htmlDetail = [];
htmlstr = " ";
generateUser = [];
userCards.html(" ");


for (let i = 0; i < apidata.length; i++) {

    generateUser [i] = new User(apidata[i]);

    htmlstr += generateUser[i].printUserCards();

    htmlDetail[i] = generateUser[i].printUserDetails();



}
userCards.html(htmlstr);
}


// Create Cards & Details

createCards(data);

createDetails(data);



// Search Input Filter

document.getElementById("search-box").addEventListener('input', function(e) {

    let inputVal = e.target.value.toLowerCase();
    console.log(inputVal);

    if(inputVal === "") {

        createCards(data);
        createDetails(data);

    }

    else {
        let filterData = [];
        let fnamestr = [];
        for (let y = 0; y < data.length; y++) {

            // $(`#id-${data[y].id}`).css("display","none");
            fnamestr[y] = data[y].firstName.toLowerCase();

            if(fnamestr[y].indexOf(inputVal) > -1) {

                filterData.push(data[y]);
                console.log(data[y].id + " " + data[y].firstName + "" +inputVal);
            }
        }
        console.log(filterData);
        createCards(filterData);
        createDetails(filterData);
    }

    });


});

});
