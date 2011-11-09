/*=================================================
  View Framework
  -------------------------------------------------
  Contains all the nescesarry code to add pages to 
  the view controller.
    +Each view uses the data field names as a
       consistent data binding between view and model
    +Each view can be extended to contain any type
       of field
    +Document onLoad initializes view controller
       and routes events to controller functions
  =================================================*/

// Define page data structure
// =================================================
View.prototype = new html_maker;
function View(v_name, v_title) {
  this.data_ref = new Object();
  this.view_elements = new Object();
  this.view_title = v_title;
  this.view_type = "view";
  this.view_name = v_name;
  this.view_selector = this.view_type+"_"+this.view_name+"_";
  this.body = $("body");
  this.view = $("<div></div>");
  this.has_pages = false;
  this.pages = new Array();
  this.curr_page = 0;
  this.last_page = 0;
}

// Define page methods
// =================================================
View.prototype.bind_data = function(data_bind) {
  this.data_ref = data_bind;
};

View.prototype.copy_values_to_fields = function() {
  for (entry in this.data_ref) {
    try{
      var current = $("#"+this.view_selector+entry);
      current.val(this.data_ref[entry]);
    }
    catch(e) {}
  }
};

View.prototype.copy_fields_to_data = function() {
  for (entry in this.data_ref) {
    try {
      if (!entry.do_not_bind) {
        var current = $("#"+this.view_selector+entry);
        this.data_ref[entry] = current.val();
      }
    }
    catch(e) {}
  }
  if (this.callback)
    this.callback();
};

View.prototype.set_callback = function(cb) {
  this.callback = cb;
};

View.prototype.make_paged = function() {
  this.has_pages = true;
};

View.prototype.make_nonpaged = function() {
  this.has_pages = false;
};

View.prototype.add_page = function(items) {
  this.pages.push(items);
};

View.prototype.set_container = function(cont_id) {
  this.container = $("#"+cont_id);
};

View.prototype.set_elements = function(elements) {
  this.view_elements = elements;
};

View.prototype.create = function() {
  (this.container||this.body).append([
    "<div class=\"",this.view_type,"\" id=\"",this.view_selector,"\"></div>"
  ].join(""));
  this.view = $("#"+this.view_selector);
  this.view.hide();
  this.view.append(
    $("<h2 class=\""+this.view_type+"_title\">"+this.view_title+"</h2>"));
};

View.prototype.make = function() {
  this.create();
  this.view.append(this.make_html(this.view_elements));
};

View.prototype.center = function() {
  var height = $(window).height();
  var top = (height-this.view.height())/2;
  var left = (($(window).width()-this.view.width())/2);
  if (top < 0)
    top = 0;
  if (left < 0)
    left = 0;
  this.view.css({
    top: top +"px",
    left: left +"px"
  });
};

View.prototype.show = function() {
  this.make();
  this.view.show();
  this.copy_values_to_fields();
  this.center();
};

View.prototype.destroy = function() {
  if (this.view.remove)
    this.view.remove();
};

/* ======================================================
   Define View Controller
   =================================================------
   Take Data and Page Models to create specified view
   ======================================================*/
function Views () {
  this.container = "body";
}

Views.prototype.set_container = function(cont_id) {
  this.container = cont_id;
};

Views.prototype.add = function(view_obj) {
  this[view_obj.view_name] = view_obj;
};

Views.prototype.show = function(view_name) {
  this.current_view = this[view_name];
  this.current_view.set_container(this.container);
  this.current_view.show();
  if (this.current_view.on_show) {this.current_view.on_show();}
};

Views.prototype.hide = function() {
  if (this.current_view)
    this.current_view.destroy();
}

Views.prototype.set_event_handlers = function(event_handlers) {
  
};
