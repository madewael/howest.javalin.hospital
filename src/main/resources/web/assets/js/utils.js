"use strict";

function _makeTextTableCell(val) {
    let $td = document.createElement("td");
    $td.appendChild(document.createTextNode(val));
    return $td;
}

function _makeTableCell(elem) {
    let $td = document.createElement("td");
    $td.appendChild(elem);
    return $td;
}

function _makeDate(val) {
    let $date = document.createElement("date");
    $date.appendChild(document.createTextNode(val));
    return $date;
}

function _makeTextarea(id, label, value) {
    let $div = document.createElement("div");
    $div.setAttribute("class", "input-group");
    let $groupPrepend = document.createElement("div");
    $groupPrepend.setAttribute("class", "input-group-prepend");
    let $span = document.createElement("span");
    $span.setAttribute("class", "input-group-text");
    $span.appendChild(document.createTextNode(label));
    $groupPrepend.appendChild($span);
    let $textarea = document.createElement("textarea");
    $textarea.setAttribute("class", "form-control");
    $textarea.setAttribute("aria-label", label);
    $textarea.setAttribute("id", id);
    if (value) { $textarea.appendChild(document.createTextNode(value)); }
    $div.appendChild($groupPrepend);
    $div.appendChild($textarea);
    return $div;
}

function _makeTextElement(type, val) {
    let $elem = document.createElement(type);
    $elem.appendChild(document.createTextNode(val)); 
    return $elem;
}

function _clearElement(elem) {
    elem.innerHTML = '';
}

function _appendChildren(elem, children) {
    children.forEach((c) => {
        elem.appendChild(c);
    })
    return children;
}

function _setChildren(elem, children) {
    _clearElement(elem);
    return _appendChildren(elem, children);
}

function _makeClickableListGroupItem(txt, onClick) {
    let $li = document.createElement("li");
    $li.setAttribute("class", "list-group-item");
    $li.addEventListener("click", onClick);
    $li.appendChild(document.createTextNode(txt));
    return $li;
}

function _makeClickableIconButton(icon, onClick) {
    let $button = document.createElement("button");  
    $button.setAttribute("class", "btn btn-default btn-sm");
    let $span = document.createElement("span"); 
    $span.setAttribute("class", icon);
    $span.setAttribute("aria-hidden", "true");
    $button.addEventListener("click", onClick);
    $button.appendChild($span);
    return $button;
}

function _makeClickableButton(txt, onClick) {
    let $button = document.createElement("button");
    $button.setAttribute("type", "button");
    $button.setAttribute("class", "btn btn-default");
    $button.appendChild(document.createTextNode(txt));
    $button.addEventListener("click", onClick);
    return $button;
}

