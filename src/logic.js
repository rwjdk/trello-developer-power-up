var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

console.log('Hello World')

window.TrelloPowerUp.initialize({
    "card-detail-badges": function (t) {
      return t.card("all")
        .then(function (card) {
          return [
            {              
              title: "Card Id",              
              text: card.id,
            },            
            {
              title: "List Id",              
              text: card.idList,
            },
          ];
        });
    },
    "card-back-section": function(t) {
      return {
        title: "Card as JSON",
        icon: GRAY_ICON,
        content : {
          type: "iframe",
          url: t.signUrl("./cardAsJson.html"),
          height: 230, // Max height is 1500.
        },
        action: {
          text: 'Copy',
          callback: (t) => console.log(JSON.stringify(t.card("all")))
        }
      }
    },
  });