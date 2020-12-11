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
    $('.tweet-container').prepend(createTweetElement(tweets[i]));
  }
};
 
function createTweetElement(data) {
  var date = moment(data.user.created_at).format("DD MMM YYYY hh:mm a")
  const $tweet = $("<article/>");

  // Template for Header Element
  const $header = $(
    `
    <header>
      <div class="img-user-username">
        <img class="avatar" src="${data.user.avatars}" alt="users avatar">
        <h2>${data.user.name}</h2>
        <p class="username">${data.user.handle}</p>
      </div>
      <p class="tweet-text">${data.content.text}</p>
  </header>
  `
  )

  // Template for Footer Element
  const $footer = $(
    `<footer class="tweet-footer">
      <p>${moment(data.created_at).fromNow()}</p>
    <div class="icons"
      <span><i class="fas fa-flag fa-1x"></i></span>
      <span><i class="fas fa-heart fa-1x"></i></span>
      <span><i class="fas fa-retweet fa-1x"></i></i></span>
    </div>

    `
  )
  return $tweet.append($header).append($footer);
}

renderTweets(tweetData);

// Error Messages Are Hidden Initially
$("#error-empty").hide()
$("#error-too-long").hide()
$(function() {
  const $submit = $(".new-tweet");
  $submit.on('submit', function (event) {
    event.preventDefault();
    const formText = $(this).serialize();

    const textAreaContent = $('#tweet-text').val();

    if(textAreaContent === "") {
          return $("#error-empty").show();
        } else if (textAreaContent.length > 140) {
          return $("#error-too-long").show();
        } else {
          $("#error-empty").hide();  
          $("#error-too-long").hide(); // Correct Input Hides Error Messages If Input Was Entered Incorrectly
          $.ajax({
            url: `tweets/`,
            method: 'POST',
            data: formText,
            success: function () {
              loadTweets();
              $('#tweet-text').val('');
              $('.counter').html(140);
            }
          });
        }
      });
    });

  // Loads Tweets From Database
  function loadTweets() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();

});