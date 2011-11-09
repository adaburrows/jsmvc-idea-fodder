/*=================================================
  Application Helper Functions
  =================================================*/
emp_autocomplete_update = function() {
  emp_name_full = function(emp) {
    var result = emp.emp_name_first;
    if (emp.emp_name_mid != "")
      result += (" " + emp.emp_name_mid);
    if (emp.emp_name_last != "")
      result += (" " + emp.emp_name_last);
    return result;
  };

  $("#view_employee_f_emp_name").autocomplete(employee_data, {
    minChars: 0,
    width: 310,
    matchContains: "word",
    autoFill: true,
    formatItem: function(row, i, max) {
      return emp_name_full(row);
    },
    formatMatch: function(row, i, max) {
      return emp_name_full(row);
    },
    formatResult: function(row) {
      return emp_name_full(row);
    }
  }).result(function(event, data, formatted){
    $(this).val(formatted);
    display_employee(formatted);
  }).val("");
};

/*=================================================
  Display Helpers
  =================================================*/
sched_head = function(curr_month, curr_day) {
  var head = {
    days:new Array(),
    dates:new Array(),
  };
  for (day in (new Schedule())) {
     head.days.push("<td class=\"sched_day sched\">");
     head.days.push(day.substring(0,3));
     head.days.push("</td>");
     head.dates.push("<td class=\"sched_date sched\">");
     head.dates.push((curr_day++));
     head.dates.push("</td>");
  }
  return head;
};

schedule_heading_small = function(curr_month, curr_day) {
  var head = sched_head(curr_month, curr_day);
  var heading = new Array();
  heading.push("<table class=\"schedule\"><thead>");
  heading.push(head.days.join(""));
  heading.push("</thead>\n<tbody><tr>");
  heading.push(head.dates.join(""));
  heading.push("</tr>\n");
  return heading;
};

schedule_heading_large = function(curr_month, curr_day) {
  var head = sched_head(curr_month, curr_day);
  var heading = new Array();
  heading.push("<table class=\"schedule\"><thead><td class=\"sched_day empty wide\"></td>");
  heading.push(head.days.join(""));
  heading.push("</thead>\n<tbody><tr><td class=\"sched_month wide\">August</td>");
  heading.push(head.dates.join(""));
  heading.push("</tr>\n");
  return heading;
};

display_schedule_by_position = function() {
  var output = schedule_heading_large("August", 16);
  for (position in positions) {
    output.push("<tr><td colspan=\"8\" class=\"sched_pos\">");
    output.push(positions[position]);
    output.push("</td></tr>\n");
    for (entry in employee_data) {
      if (positions[position] == employee_data[entry].emp_position) {
        output.push("<tr class=\"sched_emp\"><td class=\"sched_emp_name wide\">");
        output.push(employee_data[entry].emp_name_first);
        output.push("</td>");
        for (weekday in (new Schedule())) {
          output.push("<td class=\"sched_time sched\">");
          output.push(employee_data[entry].work_hours[weekday]);
          output.push("</td>");
        }
        output.push("</tr>\n");
      }
    }
  }
  output.push("</tbody></table>\n");
  return output.join("");
};

display_schedule_limits = function(sched) {
  var output = schedule_heading_small("August", 16);
  for (day in sched) {
    output.push("<td class=\"sched_time sched\">")
    output.push(sched[day]);
    output.push("</td>");
  }
  output.push("</tr></tbody></table>");
  return output.join("");
};

//display
var current_idx = new Object();

display_employee = function(employee_name) {
  var employee = $("#view_employee_employee");
  employee.hide();
  for (entry in employee_data) {
    if (emp_name_full(employee_data[entry]) == employee_name) {
      current_idx = entry;
      $("#view_employee_emp_name").text(emp_name_full(employee_data[entry]));
      for (data in employee_data[entry]) {
        if (data == "schedule_limits") {
          if (employee_data[entry][data] != "do_not_bind")
            $("#"+data).html(display_schedule_limits(employee_data[entry][data]));
        } else if (data == "work_hours") {
        }else {
          if (employee_data[entry][data] != "do_not_bind")
            $("#"+data).text(employee_data[entry][data]);
        }
      }
    }
  }
  employee.show();
  $("#view_employee_f_emp_delete").show();
  $("#view_employee_f_emp_edit").show();
};

/*=================================================
  Define Views
  =================================================*/
var app_views = new Views();
app_views.set_container("content");
var form_views = new Views();
form_views.set_container("content");

app_views.add(new View("home", "Current Schedule"));
app_views["home"].set_elements(
{
  top_bar:{type:"longbarnav", elements:
  {
    f_sched_view_by_position:{type:"button", val:"View by Position"},
    f_sched_view_by_shift:{type:"button", val:"View by Shift"},
    f_sched_view_by_sbs:{type:"submit", val:"View Side by Side"}
  }},
  schedule_table:{type:"fdiv", content:""},
  bottom_bar:{type:"longbarnav", elements:
  {
    f_sched_view_by_position:{type:"button", val:"View by Position"},
    f_sched_view_by_shift:{type:"button", val:"View by Shift"},
    f_sched_view_by_sbs:{type:"submit", val:"View Side by Side"}
  }}
});
app_views["home"].on_show = function() {
  $("#view_home_schedule_table").html(display_schedule_by_position());
  $(".sched_time").click(function(e){form_views.show("alternates");});
};

form_views.add(new form_view("alternates", "Alternate Employees"));
form_views["alternates"].make_paged();
form_views["alternates"].add_page(
{
   
});
form_views["alternates"].add_page(
{

});

app_views.add(new View("employee", "Employees"));
app_views["employee"].set_elements(
{
  top_bar:{type:"longbarnav", elements:
  {
    f_emp_add:{type:"button", val:"+ Add Employee"},
    f_emp_name:{type:"text_input"},
    f_emp_view:{type:"submit", val:"View"},
    f_emp_edit:{type:"button", val:"Edit"},
    f_emp_delete:{type:"button", val:"Delete"}
  }},
  employee:{type:"div", elements:
  {
    emp_name:{type:"h1"},
    emp_contact_info:{type:"fdiv", content:
    [
      "<dl id=\"contact_info\" class=\"emp_info\">",
      "<dt>Phone</dt><dd id=\"emp_phone_cell\" class=\"emp_contact\"></dd>",
      "<dt>Alt. Phone</dt><dd id=\"emp_phone_alt\" class=\"emp_contact\"></dd>",
      "<dt>Email</dt><dd id=\"emp_email\" class=\"emp_contact\"></dd>",
      "<dt>Twitter</dt><dd id=\"emp_twitter\" class=\"emp_contact\"></dd>",
      "</dl>"
    ].join("")},
    emp_stats:{type:"fdiv", content:
    [
      "<dl id=\"stats\" class=\"emp_info\">",
      "<dt>Average hrs/wk</dt><dd id=\"emp_avg_hrs\"></dt>",
      "<dt>YTD schedule requests</dt><dd id=\"emp_sched_reqs\"></dt>",
      "<dt>Sick days</dt><dd id=\"emp_sick_days\"></dt>",
      "<dt>Approved Requests</dt><dd id=\"emp_to_reqs_appr\"></dt>",
      "</dl>"
    ].join("")},
    emp_pos_info:{type:"fdiv", content:
    [
      "<dl id=\"position_info\" class=\"emp_info\">",
      "<dt>Position</dt><dd id=\"emp_position\"></dd>",
      "<dt>Trainer</dt><dd id=\"emp_trainer\"></dd>",
      "<dt>FT</dt><dd id=\"emp_ft\"></dd>",
      "<dt>Requested hours</dt><dd id=\"emp_req_hours\"></dd>",
      "<dt>Rating</dt><dd id=\"emp_rating\"></dd>",
      "</dl>"
    ].join("")},
    emp_sched_limits:{type:"fdiv", content:"<div id=\"schedule_limits\"></div>"}
  }}
});
app_views["employee"].on_show = function() {
  emp_autocomplete_update();
  setEmployeeHandlers();
  this.set_callback(function (){
    emp_autocomplete_update();
  });
};

form_views.add(new form_view("edit_employee", "Edit Employee"));
form_views["edit_employee"].make_paged();
form_views["edit_employee"].add_page({
  emp_name:{type:"group_input", label:"Employee Contact", elements:
  {
    emp0:{type:"ul_form", elements:
    {
      emp_name_first:{type:"text_input", label:"First Name"},
      emp_name_mid:{type:"text_input", label:"Middle Initial"},
      emp_name_last:{type:"text_input", label:"Last Name"}
    }},
    emp1:{type:"ul_form", elements:
    {
      emp_phone_cell:{type:"text_input", label:"Cell",},
      emp_phone_alt:{type:"text_input", label:"Alternate"}
    }},
    emp3:{type:"ul_form", elements:
    {
      emp_email:{type:"text_input", label:"Email"},
      emp_twitter:{type:"text_input", label:"Twitter Name"}
    }}
  }}
});
form_views["edit_employee"].add_page({
  emp_hr:{type:"group_input", label:"Position Details", elements:
  {
    emp0:{type:"ul_form", elements:{
      emp_position:{type:"text_input", label:"Position"},
      emp_trainer:{type:"checkbox", label:"Trainer"},
      emp_ft:{type:"checkbox", label:"Full-time"},
    }},
    emp1:{type:"ul_form", elements: {
      emp_req_hours:{type:"text_input", label:"Requested Hours"},
      emp_rating:{type:"text_input", label:"Employee Rating"},
    }},
    emp3:{type:"ul_form", elements: {
      emp_hire_date:{type:"text_input", label:"Date Hired"},
      emp_location:{type:"text_input", label:"Location"}
    }}
  }}
});
form_views["edit_employee"].callback = function() {
  emp_autocomplete_update();
  display_employee($("#view_employee_f_emp_name").val());
};


/*=================================================
  Document Onload
  =================================================*/
$(document).ready(function() {
  setMainHandlers();
  $("div.page").hide();
  app_views.show("employee");
});

setEmployeeHandlers = function() {
  $("#view_employee_f_emp_delete").hide();
  $("#view_employee_f_emp_edit").hide();
  $("#view_employee_employee").hide();

  emp_autocomplete_update();  

  $("#view_employee_f_emp_view").click(function(e){
    e.preventDefault();
    display_employee($("#view_employee_f_emp_name").val());
  });

  $("#view_employee_f_emp_edit").click(function(e){
    e.preventDefault();
    form_views["edit_employee"].bind_data(employee_data[current_idx]);
    form_views.show("edit_employee");
  });

  $("#view_employee_f_emp_delete").click(function(e){
    e.preventDefault();
    employee_data.splice(current_idx,1);
    emp_autocomplete_update();
    app_views.current_view.destroy();
    app_views.show("employee");
  });
};

showPage = function(e, page) {
  e.preventDefault();
  app_views.current_view.destroy();
  app_views.show(page);
};

setMainHandlers = function() {
  menu_lookup = {
    m1:"home",
    m2:"employee",
    m3:"shifts",
    m4:"requests",
    m5:"events",
    m6:"archives",
    m7:"messages",
    m8:"monitor"
  };

  for (entry in menu_lookup) {
    $("#"+entry).click(function(e) {
      showPage(e, menu_lookup[this.id]);
    });
  }
};

