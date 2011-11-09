/*=================================================
  Pop-up Form Framework
  =================================================*/

// Define view data structure
// =================================================
form_view.prototype = new View;
function form_view (v_name, v_title) {
//Without specifying all of the same members
//the prototype's data is modified.
//------------------------------------------
  this.data_ref = new Object();
  this.view_title = v_title;
  this.view_type = "form";
  this.view_name = v_name;
  this.view_selector = this.view_type+"_"+this.view_name+"_";
  this.body = $("body");
  this.view = new Object;
  this.has_pages = false;
  this.pages = new Array();
  this.curr_page = 0;
  this.last_page = 0;
}

// Define form methods
// =================================================
form_view.prototype.make = function() {
  this.create();
  if(this.has_pages == true) {
    var page_selector = new String();
    for(page in this.pages) {
      page_selector = this.view_selector.toString() + page.toString();
      this.view.append($("<div id=\""+page_selector+"\"></div>"));
      $("#"+page_selector).append($("<form>"+this.make_html(this.pages[page])+"</form>"));
      $("#"+page_selector).hide();
      this.last_page++;
    }	
  } else {
    this.view.append("<form>"+this.make_html(this.view_elements)+"</form>");
  }
  this.view.append(["<div id=\"",this.view_selector,
    "_nav\"><form><input type=\"button\" class=\"button\" id=\"",
    this.view_selector,"_cancel\" name=\"",this.view_selector,
    "_cancel\" value=\"Cancel\" /><input type=\"button\" class=\"button\" id=\"",
    this.view_selector,"_ok\" value=\"OK\" /></form></div>"].join(""));
  var self = this;
  $("#"+this.view_selector+"_cancel").click(function(e){self.cancel(e, self)});
  $("#"+this.view_selector+"_ok").click(function(e){self.ok(e, self)});
  if(this.has_pages == true) {
    $("#"+this.view_selector+"_ok").val("Next");
    $("#"+this.view_selector+"0").show();
  }
};

// Cancel/Next/OK event handlers
// =================================================
form_view.prototype.cancel = function(e,ref) {
  ref.view.hide();
  ref.destroy();
};
form_view.prototype.ok = function(e,ref) {
  if($("#"+ref.view_selector+"_ok").val() == "OK"){
    ref.view.hide();
    ref.copy_fields_to_data();
    ref.destroy();
  } else {
    $("#"+ref.view_selector+ref.curr_page).hide();
    ref.curr_page++;
    if(ref.curr_page == ref.last_page-1){
      $("#"+ref.view_selector+"_ok").val("OK");
    }
    $("#"+ref.view_selector+ref.curr_page).show();
    ref.center();
  }
};


