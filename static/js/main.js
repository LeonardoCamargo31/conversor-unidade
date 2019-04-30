"use strict";

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  } else {
    return null;
  }
}

function main() {
  var recentPostsList = document.querySelector(".js-posts");

  if ("content" in document.createElement("template")) {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function (response) {
      return response.json();
    }).then(function (json) {
      return Promise.all(json.slice(0, 5).map(function (postId) {
        return fetch("https://hacker-news.firebaseio.com/v0/item/".concat(postId, ".json")).then(function (postRes) {
          return postRes.json();
        }).then(function (postData) {
          var postTemplate = document.importNode(recentPostsList.querySelector("template").content, true);
          console.log(postData);
          var url = postData.url || "https://news.ycombinator.com/item?id=".concat(postData.id);
          postTemplate.querySelector(".js-post__title").textContent = postData.title;
          postTemplate.querySelector(".js-post__title").href = url;
          postTemplate.querySelector(".js-post__ext-link").href = "https://news.ycombinator.com/from?site=".concat(getHostName(url));
          postTemplate.querySelector(".js-post__ext-link").textContent = getHostName(url);
          postTemplate.querySelector(".js-post__points").textContent = postData.score;
          postTemplate.querySelector(".js-post__user").textContent = postData.by;
          postTemplate.querySelector(".js-post__user").href = "https://news.ycombinator.com/user?id=".concat(postData.by);
          postTemplate.querySelector(".js-post__link").href = "https://news.ycombinator.com/item?id=".concat(postData.id);
          postTemplate.querySelector(".js-post__time").textContent = timeago.format(postData.time * 1000);
          postTemplate.querySelector(".js-post__comments").textContent = "".concat(postData.descendants, " ").concat(postData.descendants > 1 || postData.descendants === 0 ? "comments" : "comment");
          recentPostsList.appendChild(postTemplate);
        });
      }));
    });
  }
}

main();

