var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.list('all')
    .then(function(list) {
        document.getElementById('listId').value = list.id;
        document.getElementById('json').value = JSON.stringify(list, null, 2);
    }).then(function(){
        return t.sizeTo(document.body);
      });;
});

function CopyListId()
{
    document.querySelector("#listId").select();
    document.execCommand('copy'); 
}

function CopyJson()
{
    document.querySelector("#json").select();
    document.execCommand('copy'); 
}

