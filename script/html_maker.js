/* =======================================================
   This is the main engine for creating html
   -------------------------------------------------------
   Everything is processed as an array to take advantage
   of the Javascript engine's native array methods' speed.

   =======================================================*/
function html_maker() {
  this.view_selector = "";
}

html_maker.prototype.make_html = function(fset) {
  return this.make_elements(fset).join("");
};

//Main html generator function
html_maker.prototype.make_elements = function(fset) {
  var element_array = new Array();
  for (field in fset) {
    element_array = element_array.concat(this[fset[field].type](field, fset[field]));
  }
  return element_array;
};

// Returns array of joined element subarrays to be enclosed within other tags
html_maker.prototype.make_inner_elements = function(fset) {
  var element_array = new Array();
  for (field in fset) {
    element_array.push(this[fset[field].type](field, fset[field]).join(""));
  }
  return element_array;
};

/* ======================================================
   Define methods to create the type of field user wants
   ------------------------------------------------------
   This section extends the type of fields available
   ======================================================*/
html_maker.prototype.h1 = function (field, data) {
  return(["<h1 id=\"", this.view_selector, field, "\"></h2>"]);
};

html_maker.prototype.title = function (field, data) {
  return(["<h2 id=\"", this.view_selector, field, "\">", data.title, "</h2>"]);
};

html_maker.prototype.longbarnav = function (field, data) {
  return(["<div id=\"", this.view_selector, field, "\" class=\"bar longbar\"><form class=\"nav\">", this.make_html(data.elements), "</form></div>"]);
};

html_maker.prototype.button = function (field, data) {
  return(["<input id=\"", this.view_selector, field, "\" type=\"button\" class=\"button\" name=\"", field, "\" value=\"", data.val, "\" />"]);
};

html_maker.prototype.submit = function (field, data) {
  return(["<input id=\"", this.view_selector, field, "\" type=\"submit\" class=\"button\" name=\"", field, "\" value=\"", data.val, "\" />"]);
};

html_maker.prototype.ul_form = function (field, data) {
  var html = new Array();
  html = html.concat(["<div class=\"ul\"><ul class=\"form\" id=\"", this.view_selector, field, "\">"]);
  temp = this.make_inner_elements(data.elements);
  for (entry in temp) {
    html = html.concat(["<li>", temp[entry], "</li>"]);
  }
  html.push("</ul></div>");
  return html;
};

html_maker.prototype.ul = function (field, data) {
  return(["<ul id=\"", this.view_selector, field, "\">", this.make_html(data.elements), "</ul>"]);
};

html_maker.prototype.li = function (field, data) {
  return(["<li id=\"", this.view_selector, field, "\">", this.make_html(data.elements), "</li>"]);
};

html_maker.prototype.text_input = function (field, data) {
  var html = new Array();
  if (data.label)
    html = html.concat(["<label for=\"", this.view_selector, field, "\">", data.label, "</label>"]);
  html = html.concat(["<input type=\"text\" id=\"", this.view_selector, field, "\" name=\"", field, "\" />"]);
  return html;
};

html_maker.prototype.checkbox = function (field, data) {
  var html = new Array()
  html = html.concat(["<label for=\"", this.view_selector, field, "\">", data.label, "</label><input type=\"checkbox\" id=\"", this.view_selector, field, "\" name=\"", this.view_selector, field, "\" value=\"Yes\" />"]);
  return html;
};

html_maker.prototype.group_input = function(field, data) {
  var html = new Array();
  html = html.concat(["<fieldset id=\"", this.view_selector, field, "\"><legend>", data.label, "</legend>", this.make_elements(data.elements).join(""), "</fieldset>"]);
  return html;
};

html_maker.prototype.div = function(field, data) {
  var html = ["<div id=\"", this.view_selector, field, "\">", this.make_html(data.elements), "</div>"];
  return html;
};

html_maker.prototype.fdiv = function(field, data) {
  var html =  ["<div id=\"", this.view_selector, field, "\">", data.content, "</div>"];
  return html;
};

html_maker.prototype.view = function(field, data) {
  data.view.set_container($("#", data.container));
  data.view.bind_data(data.data||new Object());
};

