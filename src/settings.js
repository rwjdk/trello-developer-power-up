var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.get('member', 'private', 'showForBoard', 'inherit')
        .then(showForBoardPref => {
            document.getElementById('showForBoard').value = showForBoardPref;
        });

    t.get('member', 'private', 'showForList', 'inherit')
        .then(showForListPref => {
            document.getElementById('showForList').value = showForListPref;
        });

    t.get('member', 'private', 'showForCard', 'inherit')
        .then(showForCardPref => {
            document.getElementById('showForCard').value = showForCardPref;
        });
    t.get('board', 'shared', 'showForBoardAll', 'true')
        .then(showForBoardPrefAll => {
            document.getElementById('showForBoardAll').checked = showForBoardPrefAll;
        });

    t.get('board', 'shared', 'showForListAll', 'true')
        .then(showForListPrefAll => {
            document.getElementById('showForListAll').checked = showForListPrefAll;
        });

    t.get('board', 'shared', 'showForCardAll', 'true')
        .then(showForCardPrefAll => {
            document.getElementById('showForCardAll').checked = showForCardPrefAll;
        });

    t.sizeTo(document.body);
});

function SaveSetting(select) {
    t.set('member', 'private', select.id, select.value);
}

function SaveSettingAll(checkbox) {
    t.set('board', 'shared', checkbox.id, checkbox.checked);
}