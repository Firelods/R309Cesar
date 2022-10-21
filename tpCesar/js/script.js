function CesarCode(event) {
  const inputATransform = document.getElementById("inputATransform");
  const results = document.querySelector("#results");
  const decalage = parseInt(document.querySelector("#decalage").value);
  const bruteForce = document.querySelector("#bruteForce").checked;
  console.log(bruteForce);
  if (inputATransform.checkValidity()) {
    var textInput = inputATransform.value;
    if (bruteForce) {
      var ul = document.getElementById("listResult");
      for (var i = 0; i <= 26; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(transformToCesar(textInput, i)));
        ul.appendChild(li);
      }
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
