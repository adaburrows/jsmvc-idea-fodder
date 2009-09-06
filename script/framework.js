
/* ====================================================================================================================*/


/*=================================================
  page Framework
  =================================================*/

// Define page data structure
// --------------------------
function page(pname, ptitle) {
  this.page_name = pname;
  this.page_title = ptitle;
  this.page_elements = new Object();

  this.page_selector = "page_"+this.page_name;
  this.body = $("body");
  this.body.append("<div class=\"page\" id=\""+this.page_selector+"\"></div>");
  this.page = $("#"+this.page_selector);
  this.page.hide();
}

// Define page methods
// -------------------
page.prototype.set_items = function(items) {
  this.elements = items;
};

page.prototype.make = function() {
  this.page.append(this.make_html(this.fieldset));
};

page.prototype.show = function() {
  this.make();
  this.page.show();
};

page.prototype.destroy = function() {
  this.page.remove();
};

//Main html generator function
page.prototype.make_html = function(fset) {
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
page.prototype.text = function (field, data) {
  return("<label for=\"field\">"+data.label+"</label><input type=\"text\" id=\""+field+"\" name=\""+field+"\" />");
};

page.prototype.group = function(field, data) {
  html = "<fieldset id=\""+field+"\"><legend>"+data.label+"</legend>"+this.make_html(data.group)+"</fieldset>";
  return html;
};


/* ===============================================================================================================*/

/* ======================================================
   Define Employee Model
   ======================================================*/

function employee() {
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

function EmpView () {
  this.view = new page("employee", "Employees");
  this.view.add_items({
    top_bar:{type:"div_form", klas:"longbar", elements:{
      f_add_emp:{type:"button", val:"+ Add Employee"},
      f_emp_name:{type:"text"},
      f_emp_edit:{type:"button", val:"Edit"},
      f_emp_delete:{type:"button", val:"Delete"}
    },
    employee:{type:"div", klas:"", elements:{
      insert_element_here:{type:"div", klas:""}
    }
  });
}


/* ======================================================
   Define Employee Controller
   ======================================================*/

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


