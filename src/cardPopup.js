var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.card('all')
    .then(function(card) {
        document.getElementById('cardId').value = card.id;
        document.getElementById('listId').value = card.idList;
        document.getElementById('json').value = JSON.stringify(card, null, 2);
    })
    .then(function() {
        t.board('id')
            .then(function(board) {
                document.getElementById('boardId').value = board.id;
            });
    })
    .then(function(){
        return t.sizeTo(document.body);
      });
});

function CopyCardId()
{
    document.querySelector("#cardId").select();
    document.execCommand('copy'); 
}

function CopyListId()
{
    document.querySelector("#listId").select();
    document.execCommand('copy'); 
}

function CopyBoardId() {
    document.querySelector("#boardId").select();
    document.execCommand('copy');
}

function CopyJson()
{
    document.querySelector("#json").select();
    document.execCommand('copy'); 
}