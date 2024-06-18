var PowerUpIcon = 'https://ambitious-moss-04a010603.3.azurestaticapps.net/power-up-icon.png';
var PowerUpIconLight = 'https://ambitious-moss-04a010603.3.azurestaticapps.net/power-up-icon_light.png';

var btnListPopUp = function (t, opts) {
    return t.popup({
        title: 'Get List Information',
        url: 'listPopup.html',
        height: 300
    });
};

var btnCardPopUp = function (t, opts) {
    return t.popup({
        title: 'Get Card Information',
        url: 'cardPopup.html',
        height: 300
    });
};

var btnBoardPopUp = function (t, opts) {
    return t.popup({
        title: 'Get Board Information',
        url: 'boardPopup.html',
        height: 300
    });
};

async function GetGetShowForSetting(t, setting) {
    return await t.get('member', 'private', setting, 'true');
}

window.TrelloPowerUp.initialize({
    'list-actions': async function (t) {
        const show = await GetGetShowForSetting(t, 'showForList');
        if (show) {
            return [
                {
                    text: 'Get List Info',
                    callback: btnListPopUp
                }
            ];
        } else {
            return [];
        }
    },
    'card-buttons': async function (t) {
        const show = await GetGetShowForSetting(t, 'showForCard');
        if (show) {
            return [{
                icon: PowerUpIcon,
                text: 'Get Card Info',
                callback: btnCardPopUp,
                condition: 'always'
            }];
        } else {
            return [];
        }
    },
    'board-buttons': async function (t) {
        const show = await GetGetShowForSetting(t, 'showForBoard');
        if (show) {
            return [{
                icon: {
                    dark: PowerUpIconLight,
                    light: PowerUpIcon
                },
                text: 'Get Board Info',
                callback: btnBoardPopUp,
                condition: 'always'
            }];
        } else {
            return [];
        }
    },
    'show-settings': function (t) {
        return t.popup({
            title: 'Settings',
            url: 'settings.html',
            height: 110
        });
    }
});