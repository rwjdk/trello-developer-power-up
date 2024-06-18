var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.card('all')
        .then(function (card) {
            document.getElementById('cardId').value = card.id;
            document.getElementById('listId').value = card.idList;
            document.getElementById('json').value = JSON.stringify(card, null, 2);
            const creationDate = getCreationTimeFromObjectId(card.id);
            document.getElementById('creationDate').innerText = creationDate.toLocaleString();
            BuildMemberList(card);
            BuildLabelList(card)
            BuildChecklistList(card);
        })
        .then(function () {
            t.board('id')
                .then(function (board) {
                    document.getElementById('boardId').value = board.id;
                });
        })
        .then(function () {
            return t.sizeTo(document.body);
        });
});
function ShowCopyIdConfirm(what) {
    t.alert({
        message: what + ' Copied to Clipboard'
    });
}

function switchView(selected) {
    document.getElementById('showCard').className = "heading";
    document.getElementById('showMember').className = "heading";
    document.getElementById('showLabel').className = "heading";
    document.getElementById('showChecklist').className = "heading";
    document.getElementById('Card').style = "display: none";
    document.getElementById('Label').style = "display: none";
    document.getElementById('Member').style = "display: none";
    document.getElementById('Checklist').style = "display: none";
    document.getElementById('show' + selected).className = "display: heading-selected";
    document.getElementById(selected).style = "display: block";
    t.sizeTo(document.body);
}

function CopyCardId() {
    document.querySelector("#cardId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Card Id');
}

function CopyListId() {
    document.querySelector("#listId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('List Id');
}

function CopyBoardId() {
    document.querySelector("#boardId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Board Id');
}

function CopyJson() {
    document.querySelector("#json").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Card JSON');
}

function BuildMemberList(card) {
    if (card.members.length === 0) {
        document.getElementById("noMember").style = "display: block";
    }
    else {
        const memberRoot = document.getElementById("Member");
        card.members.forEach(element => {
            const divLabel = document.createElement("div");
            divLabel.style = "display: flex; align-items: end";
            memberRoot.appendChild(divLabel)
            const memberImage = document.createElement("img");
            memberImage.src = element.avatar;
            memberImage.className = "memberImage";
            divLabel.appendChild(memberImage);
            const label = document.createElement("label");
            label.innerText = element.fullName;
            divLabel.appendChild(label);
            const divData = document.createElement("div");
            divData.style = "display: flex";
            memberRoot.appendChild(divData)
            const input = document.createElement("input");
            input.type = "text";
            input.id = "member_" + element.id;
            input.value = element.id;
            divData.appendChild(input);
            const button = document.createElement("button");
            button.title = "Copy Id to Clipboard";
            const copyImage = document.createElement("img");
            copyImage.src = "copy.png";
            button.appendChild(copyImage);
            button.addEventListener("click", function () {
                document.querySelector("#member_" + element.id).select();
                document.execCommand('copy');
                t.alert({
                    message: 'Member Id Copied to Clipboard'
                });
            });
            divData.appendChild(button);
        });
    }
}

function BuildLabelList(card) {
    if (card.labels.length === 0) {
        document.getElementById("noLabel").style = "display: block";
    }
    else {
        const memberRoot = document.getElementById("Label");
        card.labels.forEach(element => {
            const label = document.createElement("label");
            label.className = "label_" + element.color;
            label.style = "margin-bottom: 0";
            if (element.name === "") {
                label.innerText = "("+element.color+")";
            }
            else {
                label.innerText = element.name;
            }
            memberRoot.appendChild(label);
            const div = document.createElement("div");
            div.style = "display: flex";
            memberRoot.appendChild(div)

            const input = document.createElement("input");
            input.style = "margin: 0";
            input.type = "text";
            input.id = "label_" + element.id;
            input.value = element.id;
            div.appendChild(input);
            const button = document.createElement("button");
            button.title = "Copy Id to Clipboard";
            const copyImage = document.createElement("img");
            copyImage.src = "copy.png";
            button.appendChild(copyImage);
            button.addEventListener("click", function () {
                document.querySelector("#label_" + element.id).select();
                document.execCommand('copy');
                t.alert({
                    message: 'Label Id Copied to Clipboard'
                });
            });
            div.appendChild(button);
        });
    }
}

function BuildChecklistList(card) {
    if (card.checklists.length === 0) {
        document.getElementById("noChecklist").style = "display: block";
    }
    else {
        const memberRoot = document.getElementById("Checklist");
        card.checklists.forEach(element => {
            const label = document.createElement("label");
            if (element.checkItems.length == 1) {
                label.innerText = element.name + " (" + element.checkItems.length + " Item)";
            }
            else {
                label.innerText = element.name + " (" + element.checkItems.length + " Items)";
            }
            memberRoot.appendChild(label);
            const div = document.createElement("div");
            div.style = "display: flex";
            memberRoot.appendChild(div)
            const input = document.createElement("input");
            input.style = "margin: 0";
            input.type = "text";
            input.id = "checklist_" + element.id;
            input.value = element.id;
            div.appendChild(input);
            const button = document.createElement("button");
            button.title = "Copy Id to Clipboard";
            const copyImage = document.createElement("img");
            copyImage.src = "copy.png";
            button.appendChild(copyImage);
            button.addEventListener("click", function () {
                document.querySelector("#checklist_" + element.id).select();
                document.execCommand('copy');
                t.alert({
                    message: 'Checklist Id Copied to Clipboard'
                });
            });
            div.appendChild(button);
        });
    }
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