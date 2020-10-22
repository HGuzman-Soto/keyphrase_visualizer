function actions(index, data) {
  document.getElementById("tr").addEventListener("change", function() {
    let tr_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("tr").checked == true) {
      dict_values = data[index];
      let tr_outputs = eval(dict_values["tr_outputs"]);
      let clean_outputs = format_labels(tr_outputs);
      console.log(clean_outputs);

      document.getElementById("outputs").innerHTML = clean_outputs;

      tr_hl.mark(tr_outputs, {
        accuracy: "exactly",
        className: "textRank",
        color: "yellow",
        separateWordSearch: false,

        ignorePunctuation: true,

        limiters: [","],
      });
    } else {
      tr_hl.unmark({
        className: "textRank",
      });
    }
  });

  document.getElementById("tf_idf").addEventListener("change", function() {
    let tf_idf_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("tf_idf").checked == true) {
      dict_values = data[index];
      let tf_idf_outputs = eval(dict_values["keyphrases"]);
      let clean_outputs = format_labels(tf_idf_outputs);

      // let tf_idf_scores = eval(dict_values["tf_idf_scores"]);
      // console.log(tf_idf_scores);

      document.getElementById("outputs").innerHTML = clean_outputs;

      tf_idf_hl.mark(tf_idf_outputs, {
        accuracy: "exactly",
        className: "tf_idf",
        color: "green",
        ignorePunctuation: true,
        separateWordSearch: false,
        limiters: [","],
      });
    } else {
      tf_idf_hl.unmark({
        className: "tf_idf",
      });
    }
  });

  document.getElementById("awl").addEventListener("change", function() {
    let awl_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("awl").checked == true) {
      dict_values = data[index];
      let awl_labels = eval(dict_values["awl_labels"]);

      if (awl_labels.length == 0) {
        document.getElementById("outputs").innerHTML =
          "There are no awl labels in these threads";
      } else {
        let clean_outputs = format_labels(awl_labels);

        document.getElementById("outputs").innerHTML = clean_outputs;

        awl_hl.mark(awl_labels, {
          accuracy: "exactly",
          className: "awl",
          color: "orange",
          ignorePunctuation: true,
          limiters: [","],
        });
      }
    } else {
      awl_hl.unmark({
        className: "awl",
      });
    }
  });

  document.getElementById("nawl").addEventListener("change", function() {
    let nawl_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("nawl").checked == true) {
      dict_values = data[index];
      let nawl_labels = eval(dict_values["nawl_labels"]);
      if (nawl_labels.length == 0) {
        document.getElementById("outputs").innerHTML =
          "There are no nawl labels in these threads";
      } else {
        let clean_outputs = format_labels(nawl_labels);

        document.getElementById("outputs").innerHTML = clean_outputs;

        nawl_hl.mark(nawl_labels, {
          accuracy: "exactly",
          className: "nawl",
          color: "blue",
          ignorePunctuation: true,
          limiters: [","],
        });
      }
    } else {
      nawl_hl.unmark({
        className: "nawl",
      });
    }
  });

  document.getElementById("tsl").addEventListener("change", function() {
    let tsl_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("tsl").checked == true) {
      dict_values = data[index];
      let tsl_labels = eval(dict_values["tsl_labels"]);
      if (tsl_labels.length == 0) {
        document.getElementById("outputs").innerHTML =
          "There are no tsl labels in these threads";
      } else {
        let clean_outputs = format_labels(tsl_labels);

        document.getElementById("outputs").innerHTML = clean_outputs;

        tsl_hl.mark(tsl_labels, {
          accuracy: "exactly",
          className: "tsl",
          color: "purple",
          ignorePunctuation: true,
          limiters: [","],
        });
      }
    } else {
      tsl_hl.unmark({
        className: "tsl",
      });
    }
  });

  document.getElementById("ngsl").addEventListener("change", function() {
    let ngsl_hl = new Mark(document.getElementById("thread"));
    if (document.getElementById("ngsl").checked == true) {
      dict_values = data[index];
      let ngsl_labels = eval(dict_values["ngsl_labels"]);
      let clean_outputs = format_labels(ngsl_labels);

      document.getElementById("outputs").innerHTML = clean_outputs;

      ngsl_hl.mark(ngsl_labels, {
        accuracy: "exactly",
        className: "ngsl",
        color: "pink",
        ignorePunctuation: true,
        limiters: [","],
      });
    } else {
      ngsl_hl.unmark({
        className: "ngsl",
      });
    }
  });
}

function manipulate_csv(data) {
  console.log(data);
  document.getElementById("index").addEventListener("input", function() {
    let index = submitMe();
    dict_values = data[index];
    the_post = dict_values["Post"];
    the_thread = dict_values["threads"];

    document.getElementById("post").innerHTML = the_post;
    document.getElementById("thread").innerHTML = the_thread;

    actions(index, data);
  });
}

function get_csv(callBack) {
  let fileInput = document.getElementById("csv");
  let file = fileInput.addEventListener("input", (event) => {
    const file = event.target.files;
    Papa.parse(file[0], {
      delimiter: ",",
      header: true,
      complete: function(results) {
        callBack(results.data);
      },
    });
  });
}

// given an array of lables, seperate them neatly
function format_labels(labels) {
  let clean_labels = [];
  for (const l of labels) {
    clean_labels.push(" " + l);
  }
  return clean_labels;
}

function prev_val() {
  let index = document.getElementById("index").value;
  index -= 1;
  document.getElementById("index").value = index;
}

function next_val() {
  let index = document.getElementById("index").value;
  index++;
  document.getElementById("index").value = index;
}

function submitMe() {
  var value = document.getElementById("index").value;
  return value;
}

get_csv(manipulate_csv);
