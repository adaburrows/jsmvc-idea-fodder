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
// ------------------------------------------------
function View(v_name, v_title) {
  this.data_ref = new Object();
  this.callback = new function(){};

  this.view_elements = new Object();
  this.view_title = v_title;
  this.view_type = "view";
  this.view_name = v_name;
  this.view_selector = this.view_type+"_"+this.view_name+"_";
  this.body = $("body");
  this.view = new Object;

  this.has_pages = false;
  this.pages = new Array();
  this.curr_page = 0;
  this.last_page = 0;
}

View.prototype = new html_maker;

// Define page methods
// ------------------------------------------------
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
      var current = $("#"+this.view_selector+entry);
      this.data_ref[entry] = current.val();
    }
    catch(e) {}
  }
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

View.prototype.set_container = function(cont) {
  this.container = cont;
};

View.prototype.set_elements = function(elements) {
  this.elements = elements;
};

View.prototype.create = function() {
  (this.container||this.body).append("<div class=\""+this.view_type+"\" id=\""+this.view_selector+"\"></div>");
  this.view = $("#"+this.view_selector);
  this.view.hide();
  this.view.append($("<h2 class=\""+this.view_type+"\">"+this.view_title+"</h2>"));
};

View.prototype.make = function() {
  this.create();
  this.view.append(this.make_html(this.view_elements));
};

View.prototype.center = function() {
  var height = $(window).height();
  var top = (height-this.view.height())/2;
  var left = (this.body.width()-this.view.width())/2;
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
  this.view.remove();
};


/* ======================================================
   Define View Controller
   ------------------------------------------------------
   Take Data and Page Models to create specified view
   ======================================================*/
function Views () {
  this.current_view = new Object();
}

Views.prototype.add = function(view_obj) {
  this[view_obj.view_name] = view_obj;
};

Views.prototype.show = function(view_name) {
  try {
    this.current_view.destroy();
  } catch (e) {}
  this.current_view = this[view_name];
  this.current_view.make();
  this.current_view.show();
};

/* ===============================================================================================================*/

/* ======================================================
   Define Employee Model
   ======================================================*/

function Employee() {
  this.emp_name_first="";
  this.emp_name_middle="";
  this.emp_name_last="";
  this.emp_phone_cell="";
  this.emp_phone_alt="";
  this.emp_email="";
  this.emp_twitter="";

  this.emp_position="";
  this.emp_trainer="";
  this.emp_ft="";
  this.emp_req_hours="";
  this.emp_rating="";
  this.emp_hire_date="";
  this.emp_location="";

  this.emp_avg_hrs="";
  this.emp_sched_reqs="";
  this.emp_sick_days="";
  this.emp_to_reqs_appr="";

  this.schedule_limits = new Schedule();
  this.work_hours = new Schedule();
}


/* ======================================================
   Define Employee View
   ======================================================*/
/*
function EmpView () {
  this.view = new page("employee");
  this.view.add_items({
    title:{type:title, title:"Employees"},
    top_bar:{type:"longbar", elements:{
      f_add_emp:{type:"button", val:"+ Add Employee"},
      f_emp_name:{type:"text_input"},
      f_emp_view:{type:"submit", val:"View"}
      f_emp_edit:{type:"button", val:"Edit"},
      f_emp_delete:{type:"button", val:"Delete"}}
    },
    employee:{type:"div", elements:{
      emp_name:{type:"h1"},
      emp_contact_info:{type:"div", elements:{
        
      },
      emp_stats:{type:"div", elements:{
        
      },
      emp_pos_info::{type:"div", elements:{
        
      },
      emp_sched_limits:{type:"div", elements:{
        
      }
    }
  });
}
*/

/* ======================================================
   Define Employee Controller
   ======================================================*/
/*
function EmpCon () {
  this.employees = new Array();
  this.emp_current = new Object();
}

EmpCon.prototype.get_employees = function () {

};

EmpCon.prototype.emp_del = function () {

};

EmpCon.prototype.emp_add = function () {

};

EmpCon.prototype.emp_view = function () {

};

EmpCon.prototype.emp_edit = function () {

};

*/
