chrome.storage.local.get(["jokes"], function(items) {
  // null implies all items
  // Convert object to a string.
  var result = JSON.stringify(items);

  // Save as file
  var url =
    "data:application/json;base64," +
    btoa(unescape(encodeURIComponent(result)));
  chrome.downloads.download({
    url: url,
    filename: "threads.json",
  });
});

// chrome.storage.local.get(["vocab"], function(items) {
//   // null implies all items
//   // Convert object to a string.
//   var result = JSON.stringify(items);

//   // Save as file
//   var url =
//     "data:application/json;base64," +
//     btoa(unescape(encodeURIComponent(result)));
//   chrome.downloads.download({
//     url: url,
//     filename: "vocab.json",
//   });
// });
