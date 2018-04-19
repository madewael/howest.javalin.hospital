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

function _makeSearchInput(txt, id, target, buttonTxt) {
    let $form = document.createElement("form");
    let $inputGroup = document.createElement("div");
    $inputGroup.setAttribute("class", "input-group");
    let $input = document.createElement("input");
    $input.setAttribute("class", "form-control width100");
    $input.setAttribute("type", "text");
    $input.setAttribute("id", id);
    $input.setAttribute("readonly", true);
    let $span = document.createElement("span");
    $span.setAttribute("class", "input-group-btn");
    let $button = document.createElement("button");
    $button.setAttribute("type", "button");
    $button.setAttribute("class", "btn btn-default");
    $button.setAttribute("data-toggle", "modal");
    $button.setAttribute("data-target", target);
    let $bSpan = document.createElement("span");
    $bSpan.setAttribute("class", "glyphicon glyphicon-search");
    $bSpan.setAttribute("aria-hidden", "true");
    let bTxt = document.createTextNode(buttonTxt);
    $bSpan.appendChild(bTxt);
    $button.appendChild($bSpan);
    $span.appendChild($button);
    $inputGroup.appendChild($input);
    $inputGroup.appendChild($span);
    $form.appendChild($inputGroup);
    return $form;
}


function _makeSearchModal(id, label, title, onkeyupFct, inputId, listId) {
    let $div1 = document.createElement("div");
    $div1.setAttribute("class", "modal fade");
    $div1.setAttribute("id", id);
    $div1.setAttribute("tabindex", "-1");
    $div1.setAttribute("aria-labelledby", label);
    $div1.setAttribute("aria-hidden", true);
    let $div2 = document.createElement("div");
    $div2.setAttribute("class", "modal-dialog");
    $div2.setAttribute("role", document);
    let $div3 = document.createElement("div");
    $div3.setAttribute("class", "modal-content");
    let $div4 = document.createElement("div");
    $div4.setAttribute("class", "modal-header");
    let $h = document.createElement("h5");
    $h.setAttribute("class", "modal-title");
    let $hTxt = document.createTextNode(title);
    $h.appendChild($hTxt);
    let $button = document.createElement("button");
    $button.setAttribute("type", "button");
    $button.setAttribute("dta-dismiss", "modal");
    $button.setAttribute("aria-label", "Close");
    let $span = document.createElement("span");
    $span.setAttribute("aria-hidden", "true");
    $span.appendChild(document.createTextNode("&times;"));
    $button.appendChild($span);
    $div4.appendChild($h);
    $div4.appendChild($button);
    let $div5 = document.createElement("div");
    $div5.setAttribute("class", "modal-body");
    let $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.setAttribute("class", "form-control");
    $input.setAttribute("placeholder", "");
    $input.addEventListener("keyup", onkeyupFct);
    $input.setAttribute("id", inputId);
    let $ul = document.createElement("ul");
    $ul.setAttribute("class", "list-group");
    $ul.setAttribute("id", listId);
    $div5.appendChild($input);
    $div5.appendChild($ul);
    $div2.appendChild($div3);
    $div2.appendChild($div5);
    $div1.appendChild($div2);
    return $div1;
}

