/*=================================================
  Form Framework
  =================================================*/

// Define form data structure
// --------------------------
function form_view (f_name, f_title) {
  this.has_pages = false;
  this.pages = new Array();
  this.fieldset = new Object();
  this.form_title = f_title;
  this.form_name = f_name;
  this.form_selector = "form_"+this.form_name;
  this.curr_page = 0;
  this.last_page = 0;
  this.data_ref = new Object();
  this.body = $("body");
  this.body.append("<div class=\"form\" id=\""+this.form_selector+"\"></div>");
  this.form = $("#"+this.form_selector);
  this.form.hide();
  this.callback = new Function()
}

// Define form methods
// -------------------
form_view.prototype.bind = function(data_bind) {
  this.data_ref = data_bind;
};

form_view.prototype.bind_values = function() {
  for (entry in this.data_ref) {
    try{
      var current = $("#form_"+entry);
      current.val(this.data_ref[entry]);
    }
    catch(e) {}
  }
};

form_view.prototype.bind_data = function() {
  for (entry in this.data_ref) {
    try {
      var current = $("#form_"+entry);
      this.data_ref[entry] = current.val();
    }
    catch(e) {}
  }
  this.callback();
};

form_view.prototype.set_callback = function(cb) {
  this.callback = cb;
}

form_view.prototype.add_fields = function(items) {
  this.fieldset = items;
};

form_view.prototype.make_paged = function() {
  this.has_pages = true;
};

form_view.prototype.make_nonpaged = function() {
  this.has_pages = false;
};

form_view.prototype.add_page = function(items) {
  this.pages.push(items);
};

form_view.prototype.make = function() {
  this.form.append($("<h2 class=\"form\">"+this.form_title+"</h2>"));

  if(this.has_pages == true) {
    var page_selector = new String();
    for(page in this.pages) {
      page_selector = this.form_selector.toString() + page.toString();
      this.form.append($("<div id=\""+page_selector+"\"></div>"));
      $("#"+this.form_selector+page).append($("<form>"+this.make_html(this.pages[page])+"</form>"));
      $("#"+this.form_selector+page).hide();
      this.last_page++;
    }	
  } else {
    this.form.append("<form>"+this.make_html(this.fieldset)+"</form>");
  }

  this.form.append("<div id=\""+this.form_selector+"_nav\"><form><input type=\"button\" class=\"button\" id=\""+this.form_selector+"_cancel\" name=\""+this.form_selector+"_cancel\" value=\"Cancel\" /><input type=\"button\" class=\"button\" id=\""+this.form_selector+"_ok\" value=\"OK\" /></form></div>");

  var self = this;
  $("#"+this.form_selector+"_cancel").click(function(e){self.cancel(e, self)});
  $("#"+this.form_selector+"_ok").click(function(e){self.ok(e, self)});
  if(this.has_pages == true) {
    $("#"+this.form_selector+"_ok").val("Next");
    $("#"+this.form_selector+"0").show();
  }

};

form_view.prototype.center = function() {
  this.form.css({
    top: (this.body.height()-this.form.height())/2 +"px",
    left: (this.body.width()-this.form.width())/2 +"px"
  });
};

form_view.prototype.show = function() {
  this.make();
  this.bind_values();
  this.form.show();
  this.center();
};

form_view.prototype.destroy = function() {
  this.form.remove();
};

// Cancel/Next/OK event handlers
// -----------------------------
form_view.prototype.cancel = function(e,ref) {
  ref.form.hide();
  ref.destroy();
};

form_view.prototype.ok = function(e,ref) {
  if($("#"+ref.form_selector+"_ok").val() == "OK"){
    ref.form.hide();
    ref.bind_data();
    ref.destroy();
  } else {
    $("#"+ref.form_selector+ref.curr_page).hide();
    ref.curr_page++;
    if(ref.curr_page == ref.last_page-1){
      $("#"+ref.form_selector+"_ok").val("OK");
    }
    $("#"+ref.form_selector+ref.curr_page).show();
    ref.center();
  }
};

//Main html generator function
form_view.prototype.make_html = function(fset) {
  html = "";
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
form_view.prototype.text = function (field, data) {
  return("<label for=\""+field+"\">"+data.label+"</label><input type=\"text\" id=\"form_"+field+"\" name=\""+field+"\" />");
};

form_view.prototype.group = function(field, data) {
  html = "<fieldset id=\"form_"+field+"\"><legend>"+data.label+"</legend>"+this.make_html(data.group)+"</fieldset>";
  return html;
};



