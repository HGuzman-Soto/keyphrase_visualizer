function CheckBrowser() {
  if ("localStorage" in window && window["localStorage"] !== null) {
    console.log(localStorage);
    //We can use local storage object to store data
    return true;
  } else {
    return false;
  }
}

function doShowAll() {
  if (CheckBrowser()) {
    let key = "";
    let list = "<tr><th>Item</th><th>Value</th></tr>\n";
    let i = 0;

    for (i = 0; i <= localStorage.length - 1; i++) {
      key = localStorage.key(i);
      console.log(key);
      list +=
        "<tr><td>" +
        key +
        "</td>\n<td>" +
        localStorage.getItem(key) +
        "</td></tr>\n";
    }
    //If no item exists in the cart
    if (list == "<tr><th>Item</th><th>Value</th><tr>\n") {
      list += "<tr><td><i>empty</t></td>\n<td><i>empty</i></td></tr>\n";
    }
    //Bind the data to HTML table
    document.getElementById("list").innerHTML = list;
  } else {
    alert(
      "You cannot save shopping list as your brower does not support HTML5"
    );
  }
}

function SaveItem() {
  let name = document.forms.ShoppingList.name.value;
  let data = document.forms.ShoppingList.data.value;

  localStorage.setItem(name, data);
  doShowAll();
}

function ModifyItem() {
  let name1 = document.forms.ShoppingList.name.value;
  let data1 = document.forms.ShoppingList.data.value;
  //check if name1 already exists

  //check if key exists
  if (localStorage.getItem(name1) != null) {
    //update
    localStorage.setItem(name1, data1);
    document.forms.ShoppingList.data.value = localStorage.getItem(name1);
  }
  doShowAll();
}

function RemoveItem() {
  let name = document.forms.ShoppingList.name.value;
  let data = document.forms.ShoppingList.data.value;

  if (localStorage.getItem(name) != null) {
    //remove
    localStorage.removeItem(name);
  } else {
    alert("That item does not exist");
  }
  doShowAll();
}

function ClearAll() {
  localStorage.clear();
  doShowAll();
}
