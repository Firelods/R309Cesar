function CesarCode(event) {
  const inputATransform = document.getElementById("inputATransform");
  const results = document.querySelector("#results");
  const decalage = parseInt(document.querySelector("#decalage").value);
  const bruteForce = document.querySelector("#bruteForce").checked;
  const exo4 = document.querySelector("#Exo4").checked;
  event.preventDefault();
  if (inputATransform.checkValidity()) {
    var textInput = inputATransform.value;
    if (bruteForce) {
      var ul = document.getElementById("listResult");
      for (var i = 0; i <= 26; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(transformToCesar(textInput, i)));
        ul.appendChild(li);
      }
    } else if (exo4) {
      var dict = readTextFile("assets/frequence_francais.txt");
      var dict2 = turnDictInProb(dict);
      var proba = [];
      for (var i = 0; i <= 26; i++) {
        var probaChar = 0;
        for (var key in dict2) {
          probaChar += Math.abs(
            charProbInMsg(key, transformToCesar(textInput, i)) -
            dict2[key]
          );
        }
        proba.push(probaChar);
      }
      var min = Math.min(...proba);
      var index = proba.indexOf(min);
      results.innerHTML = transformToCesar(textInput, index);
    } else {
      results.textContent = transformToCesar(textInput, decalage);
    }
  }
}

function transformToCesar(textInput, decalage) {
  var result = "";
  for (var i = 0; i < textInput.length; i++) {
    var char = textInput[i].charCodeAt(0);
    result += String.fromCharCode(
      ((((char - 65 + decalage) % 26) + 26) % 26) + 65
    );
  }
  return result;
}

function readTextFile(file) {
  var dict = {};
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        allText.split(/\r?\n/).forEach((line) => {
          var lineSplitted = line.split(" ");
          if (lineSplitted.length > 1) {
            dict[lineSplitted[0]] = lineSplitted[1];
          }
        });
      }
    }
  };
  rawFile.send(null);
  return dict;
}

function turnDictInProb(dict) {
  var sum = 0;
  for (var key in dict) {
    sum += parseInt(dict[key]);
  }
  for (var key in dict) {
    dict[key] = parseInt(dict[key]) / sum;
  }
  return dict;
}

function charProbInMsg(char, msg) {
  var appear = 0;
  for (var i = 0; i < msg.length; i++) {
    if (msg[i] == char) {
      appear++;
    }
  }
  return appear / msg.length;
}