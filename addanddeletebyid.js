// ==UserScript==
// @name         Blob.io - Unfriend and Friend
// @version      2025-1-2
// @author       d123450789 + Alcatel
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @match        *://blobgame.io/*
// @icon         https://cdn.discordapp.com/icons/1286168636586987580/57b3fc6cff46194b5af46da57bf4088a.webp?size=240
// @grant        none
// @grant        GM_setValue
// @grant        GM_getValue
// @license MIT
// ==/UserScript==

(function () {
  'use strict';

  var token = localStorage.getItem('access-token')

  function showFriends() {
    var my_div = document.querySelector("#modal > app-friend > div.header > div.center");
    my_div.innerHTML = my_div.innerHTML + '<input id="inputFriendID" type="text">';
    my_div.innerHTML = my_div.innerHTML + '<button id="clickedUnfriend" type="button">Delete</button>';
    my_div.innerHTML = my_div.innerHTML + '<input id="inputFriendIDADD" type="text">';
    my_div.innerHTML = my_div.innerHTML + '<button id="clickedAddFriend" type="button">Add</button>';

    document.getElementById('clickedUnfriend').addEventListener('click', function () {
      sendRequest(2);
    });

    document.getElementById('clickedAddFriend').addEventListener('click', function () {
      sendRequest(0);
    });
  }

  function sendRequest(status) {
    var personID = document.getElementById('inputFriendID');
    var personIDADD = document.getElementById('inputFriendIDADD');

    if ((status === 2 && personID.value === '') || (status === 0 && personIDADD.value === '')) {
      alert("Enter a valid ID!");
      return;
    }

    var targetID = (status === 2) ? personID.value : personIDADD.value;

    $.ajax({
      type: "POST",
      url: "https://api.blobgame.io:988/api/users/setRelation/",
      data: {
        "api_ver": "4.7",
        "pl": "1",
        "status": status,
        "target_id": targetID,
        "token": token
      },
      success: function (data) {
        console.log(data);
        if (status === 2) {
          alert("Deleted " + targetID + "!");
        } else {
          alert("Added " + targetID + "!");
        }
      },

    });
  }

  const bro = document.querySelector("body > app-root > app-main > div.wrapper > header > div.right > button.friends.icon-button").addEventListener("click", showFriends);

})();
