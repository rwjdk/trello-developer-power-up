var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.list('all')
        .then(function (list) {
            document.getElementById('listId').value = list.id;
            document.getElementById('json').value = JSON.stringify(list, null, 2);
            const creationDate = getCreationTimeFromObjectId(list.id);
            document.getElementById('creationDate').innerText = creationDate.toLocaleString();
            console.log(list.cards);
            if (list.cards.length == 1) {
                document.getElementById('numberOfCards').innerText = list.cards.length + " Card";
            }
            else {
                document.getElementById('numberOfCards').innerText = list.cards.length + " Cards";
            }
            BuildCardList(list);
        }).then(function () {
            return t.sizeTo(document.body);
        });;
});
function ShowCopyIdConfirm(what) {
    t.alert({
        message: what + ' Copied to Clipboard'
    });
}
function CopyListId() {
    document.querySelector("#listId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('List Id');
}

function CopyJson() {
    document.querySelector("#json").select();
    document.execCommand('copy');
    ShowCopyIdConfirm("List JSON");
}

function switchView(selected) {
    document.getElementById('showList').className = "heading";
    document.getElementById('showCard').className = "heading";
    document.getElementById('List').style = "display: none";
    document.getElementById('Card').style = "display: none";
    document.getElementById('show' + selected).className = "display: heading-selected";
    document.getElementById(selected).style = "display: block";
    t.sizeTo(document.body);
}


function getCreationTimeFromObjectId(objectId) {
    // Check if the ID is a valid hexadecimal string
    if (!/^[0-9a-fA-F]{24}$/.test(objectId)) {
        return null; // Invalid ID format
    }

    // Extract the timestamp part (first 8 characters) and convert from hex to decimal
    const timestamp = parseInt(objectId.substring(0, 8), 16);

    // Convert the timestamp to milliseconds since epoch (January 1, 1970, 00:00:00 UTC)
    const creationTime = timestamp * 1000;

    // Create a JavaScript Date object from the milliseconds
    return new Date(creationTime);
}

function BuildCardList(list) {
    if (list.cards.length === 0) {
        document.getElementById("noCard").style = "display: block";
    }
    else {
        const memberRoot = document.getElementById("Card");
        list.cards.forEach(element => {
            const label = document.createElement("label");
            label.innerText = element.name;
            memberRoot.appendChild(label);
            const div = document.createElement("div");
            div.style = "display: flex";
            memberRoot.appendChild(div)
            const input = document.createElement("input");
            input.style = "margin: 0";
            input.type = "text";
            input.id = "card_" + element.id;
            input.value = element.id;
            div.appendChild(input);
            const button = document.createElement("button");
            button.title = "Copy Id to Clipboard";
            const copyImage = document.createElement("img");
            copyImage.src = "copy.png";
            button.appendChild(copyImage);
            button.addEventListener("click", function () {
                document.querySelector("#card_" + element.id).select();
                document.execCommand('copy');
                t.alert({
                    message: 'Card Id Copied to Clipboard'
                });
            });
            div.appendChild(button);
        });
    }
}