// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [ { 
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}]



$(document).ready(function() { 

// RENDER TWEETS FROM DATABASE
function renderTweets(tweets) {
  for (let i = 0, len = tweets.length; i < len; i++) {
    $('.tweet-container').append(createTweetElement(tweets[i]));
  }
};

 
function createTweetElement(data) {
  const $tweet = $("<article/>");
  // header element
  const $header = $(
    `
    <header>
    <img class="avatar" src="${data.user.avatars}" alt="users avatar">
    <h2>${data.user.name}</h2>
    <p class="username">${data.user.handle}</p>
    <p class="tweet-text">${data.content.text}</p>
  </header>
  `
  )
  const $footer = $(
    `<footer>
    <p></p>
    <p>
    <span><i class="fas fa-flag fa-1x"></i></span>
    <span><i class="fas fa-heart fa-1x"></i></span>
    <span><i class="fas fa-retweet fa-1x"></i></i></span>
  </p>
    `
  )
  return $tweet.append($header).append($footer);
}

renderTweets(tweetData);


const URL = 'http://localhost:3000';

$(function() {
  var $submit = $(".new-tweet");
  $submit.on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();
    var formText = $(this).serialize();

    var textAreaContent = $('#tweet-text').val();
        // debugger;
        console.log(textAreaContent === "");

        if(textAreaContent === "") {
          return alert("Tweet submission cannot be empty");
        } else if (textAreaContent.length > 140) {
          return alert("Tweet cannot be longer than 140 characters");
        } else {
          $.ajax({
            url: `tweets/`,
            method: 'POST',
            data: formText,
            success: function () {
              loadTweets();
              $('#tweet-text').val('');
              $('.counter').html(140);
              console.log('the ajax request is successfull');
            }
          });
        }
      });
    });


  function loadTweets() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      success: function (data) {
        console.log('Success: ', data);
        renderTweets(data);
      }
    });
  }
  loadTweets();

});

