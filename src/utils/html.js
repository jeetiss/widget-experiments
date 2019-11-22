let parseHTML = function(str) {
  let tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children[0];
};

let toString = (obj) => {
  if (Array.isArray(obj)) return obj.join('')

  return obj
}

let html = (parts, ...insertions) => {
  return parseHTML(parts.map((part, i) => part.concat(toString(insertions[i]))).join(""));
};

export default html
