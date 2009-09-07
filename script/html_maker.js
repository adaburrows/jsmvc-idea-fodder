function html_maker() {
  this.view_selector = "";
}

//Main html generator function
html_maker.prototype.make_html = function(fset) {
  html = new String();
  for (field in fset) {
    html += this[fset[field].type](field, fset[field]);
  }
  return html;
};

/* ======================================================
   Define methods to create the type of field user wants
   ------------------------------------------------------
   This section extends the type of fields available
   ======================================================*/
html_maker.prototype.title = function (field, data) {
  return("<h2 id=\""+this.view_selector+field+"\">"+data.title+"</h2>");
};

html_maker.prototype.longbarnav = function (field, data) {
  return("<div id=\""+this.view_selector+field+"\" class=\"bar longbar\"><form class=\"nav\">"+this.make_html(data.elements)+"</form></div>");
};

html_maker.prototype.button = function (field, data) {
  return("<input id=\""+this.view_selector+field+"\" type=\"button\" class=\"button\" name=\""+field+"\" value=\""+data.val+"\" />");
};

html_maker.prototype.submit = function (field, data) {
  return("<input id=\""+this.view_selector+field+"\" type=\"submit\" class=\"button\" name=\""+field+"\" value=\""+data.val+"\" />");
};

html_maker.prototype.text_input = function (field, data) {
  html = "";
  if (data.label)
    html += "<label for=\"field\">"+data.label+"</label>"
  html += "<input type=\"text\" id=\""+this.view_selector+field+"\" name=\""+field+"\" />"
  return html;
};

html_maker.prototype.choice = function (field, data) {
  return("<label for=\""+field+"\">"+data.label+"</label>Yes<input type=\"radio\" id=\"form_"+field+"\" name=\""+field+"\" value=\"Yes\" />No<input type=\"radio\" id=\"form_"+field+"\" name=\""+field+"\" value=\"No\" />");
};

html_maker.prototype.group_input = function(field, data) {
  html = "<fieldset id=\""+this.view_selector+field+"\"><legend>"+data.label+"</legend>"+this.make_html(data.elements)+"</fieldset>";
  return html;
};

html_maker.prototype.div = function(field, data) {
  html = "<div id=\""+this.view_selector+field+"\">"+this.make_html(data.elements)+"</div>";
  return html;
};

html_maker.prototype.fdiv = function(field, data) {
  html = "<div id=\""+this.view_selector+field+"\">"+data.content+"</div>";
  return html;
};

html_maker.prototype.view = function(field, data) {
  data.view.set_container($("#"+data.container));
  data.view.bind_data(data.data||new Object());
};

