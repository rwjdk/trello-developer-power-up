var t = window.TrelloPowerUp.iframe();

t.render(function () {
    t.board('all')
    .then(function(board) {
        document.getElementById('boardId').value = board.id;
        document.getElementById('json').value = JSON.stringify(board, null, 2);
    }).then(function(){
        return t.sizeTo(document.body);
      });;
});

function CopyBoardId()
{
    document.querySelector("#boardId").select();
    document.execCommand('copy'); 
}

function CopyJson()
{
    document.querySelector("#json").select();
    document.execCommand('copy'); 
}

