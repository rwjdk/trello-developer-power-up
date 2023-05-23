var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.get('member', 'private', 'showForBoard', 'true')
        .then(showForBoardPref => {
            document.getElementById('showForBoard').checked = showForBoardPref;
        });

    t.get('member', 'private', 'showForList', 'true')
        .then(showForListPref => {
            document.getElementById('showForList').checked = showForListPref;
        });

    t.get('member', 'private', 'showForCard', 'true')
        .then(showForCardPref => {
            document.getElementById('showForCard').checked = showForCardPref;
        });
});

function SaveSetting(checkbox) {
    t.set('member', 'private', checkbox.id, checkbox.checked);
}