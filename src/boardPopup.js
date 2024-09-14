var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.board('all')
        .then(function (board) {
            document.getElementById('boardId').value = board.id;
            document.getElementById('orgId').value = board.idOrganization;
            document.getElementById('json').value = JSON.stringify(board, null, 2);
            const creationDate = getCreationTimeFromObjectId(board.id);
            document.getElementById('creationDate').innerText = creationDate.toLocaleString();
            BuildMemberList(board);
            BuildLabelList(board)
            BuildCustomFieldsList(board);
        }).then(function () {
            return t.sizeTo(document.body);
        });;
});

function IsAdmin(board, memberId) {
    const firstObjectWithId = board.memberships.find(obj => obj.idMember === memberId);
    if (firstObjectWithId && firstObjectWithId.memberType === "admin") {
        return " (Admin)";
    }
    return "";
}

function BuildMemberList(board) {
    const memberRoot = document.getElementById("Member");
    board.members.forEach(element => {
        const divLabel = document.createElement("div");
        divLabel.style = "display: flex; align-items: end";
        memberRoot.appendChild(divLabel)
        const memberImage = document.createElement("img");
        memberImage.src = element.avatar;
        memberImage.className = "memberImage";
        divLabel.appendChild(memberImage);
        const label = document.createElement("label");
        label.innerText = element.fullName + IsAdmin(board, element.id);
        divLabel.appendChild(label);
        const divData = document.createElement("div");
        divData.style = "display: flex";
        memberRoot.appendChild(divData)
        const input = document.createElement("input");
        input.type = "text";
        input.setAttribute('readonly', true);
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

function BuildCustomFieldsList(board) {
    if (board.customFields.length > 0) {
        const root = document.getElementById("CustomFields");
        root.style.display = "block";
        board.customFields.forEach(element => {
            const customField = document.createElement("label");
            customField.style = "margin-bottom: 0;";
            customField.innerText = "Custom Field: '"+element.name+"' ("+element.type.charAt(0).toUpperCase()+element.type.slice(1)+")";
            root.appendChild(customField);
            const div = document.createElement("div");
            div.style = "display: flex";
            root.appendChild(div)
            const input = document.createElement("input");
            input.style = "margin: 0";
            input.setAttribute('readonly', true);
            input.type = "text";
            input.id = "label_" + element.id;
            input.value = element.id;
            div.appendChild(input);
            const button = document.createElement("button");
            button.title = "Copy Csutom Field Id to Clipboard";
            const copyImage = document.createElement("img");
            copyImage.src = "copy.png";
            button.appendChild(copyImage);
            button.addEventListener("click", function () {
                document.querySelector("#label_" + element.id).select();
                document.execCommand('copy');
                t.alert({
                    message: "Custom Field '"+element.name+"' Id Copied to Clipboard"
                });
            });
            div.appendChild(button);
            if(element.options)
            {
                element.options.forEach(option => {
                const optionLabel = document.createElement("label");
                optionLabel.style = "padding-left: 15px; margin: 1px; color: gray";
                optionLabel.innerText = "Option '"+option.value.text+"'";
                root.appendChild(optionLabel);
                const div = document.createElement("div");
                div.style = "display: flex; padding-left: 15px";
                root.appendChild(div)
                const input = document.createElement("input");
                input.style = "margin: 0; font-size: 12px;";
                input.setAttribute('readonly', true);
                input.type = "text";
                input.id = "label_" + option.id;
                input.value = option.id;
                div.appendChild(input);
                const button = document.createElement("button");
                button.title = "Copy Option Id to Clipboard";
                const copyImage = document.createElement("img");
                copyImage.src = "copy.png";
                button.appendChild(copyImage);
                button.addEventListener("click", function () {
                    document.querySelector("#label_" + option.id).select();
                    document.execCommand('copy');
                    t.alert({
                        message: "Option '"+option.value.text+"' for custom field '"+element.name+"' Id Copied to Clipboard"
                    });
                });
                div.appendChild(button);

                });
            }

        });
    }
}

function BuildLabelList(board) {
    const labelRoot = document.getElementById("Label");
    board.labels.forEach(element => {
        const label = document.createElement("label");
        label.className = "label_" + element.color;
        label.style = "margin-bottom: 0";
        if (element.name === "") {
            label.innerText = "(" + element.color + ")";
        }
        else {
            label.innerText = element.name;
        }
        labelRoot.appendChild(label);
        const div = document.createElement("div");
        div.style = "display: flex";
        labelRoot.appendChild(div)

        const input = document.createElement("input");
        input.style = "margin: 0";
        input.setAttribute('readonly', true);
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

function ShowCopyIdConfirm(what) {
    t.alert({
        message: what + ' Copied to Clipboard'
    });
}

function CopyWorkSpaceId() {
    document.querySelector("#orgId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Workspace Id');
}

function CopyBoardId() {
    document.querySelector("#boardId").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Board Id');
}

function CopyJson() {
    document.querySelector("#json").select();
    document.execCommand('copy');
    ShowCopyIdConfirm('Board JSON');
}

function switchView(selected) {
    document.getElementById('showOther').className = "heading";
    document.getElementById('showBoard').className = "heading";
    document.getElementById('showMember').className = "heading";
    document.getElementById('showLabel').className = "heading";
    document.getElementById('Other').style = "display: none";
    document.getElementById('Board').style = "display: none";
    document.getElementById('Label').style = "display: none";
    document.getElementById('Member').style = "display: none";
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