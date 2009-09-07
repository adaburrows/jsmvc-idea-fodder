emp_name_full = function(emp) {
  var result = emp.emp_name_first;
  if (emp.emp_name_mid != "")
    result += (" " + emp.emp_name_mid);
  if (emp.emp_name_last != "")
    result += (" " + emp.emp_name_last);
  return result;
};

/*=================================================
  Application Helper Functions
  =================================================*/
showPage = function(e, page) {
  e.preventDefault();
  $("div.page").hide();
  $("#"+page).show(700);
};

setScheduleHandlers = function() {
  $("#schedule_table").html(display_schedule_by_position());
};

emp_autocomplete_update = function() {
  $("#f_emp_name").autocomplete(employee_data, {
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

setEmployeeHandlers = function() {
  $("#f_emp_delete").hide();
  $("#employee").hide();

  emp_autocomplete_update();  

  $("#f_emp_view").click(function(e){
    e.preventDefault();
    display_employee($("#f_emp_name").val());
  });

  $("#f_emp_delete").click(function(e){
    e.preventDefault();
    edit_employee(employee_data[current_idx]);
  });
};

setMainHandlers = function() {
  menu_lookup = {
    m1:"home",
    m2:"employees",
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
  setScheduleHandlers();
  setEmployeeHandlers();
};

/*=================================================
  Display Helpers
  =================================================*/

schedule_heading = function(curr_month, curr_day) {
  var days = new String();
  var dates = new String();
  for (day in (new Schedule())) {
     days += "<td class=\"sched_day sched\">"+day.substring(0,3)+"</td>";
     dates += "<td class=\"sched_date sched\">"+(curr_day++)+"</td>";
  }
  var heading = "<table class=\"schedule\"><thead><td class=\"sched_day empty wide\"></td>" +days + "</thead>\n<tbody><tr><td class=\"sched_month wide\">August</td>" + dates + "</tr>\n";
  delete days;
  delete dates;
  return heading;
};

display_schedule_by_position = function() {
  var output = schedule_heading("August", 16);

  for (position in positions) {
    output += "<tr><td colspan=\"8\" class=\"sched_pos\">"+positions[position]+"</td></tr>\n";
    for (entry in employee_data) {
      if (positions[position] == employee_data[entry].emp_position) {
        output += "<tr class=\"sched_emp\"><td class=\"sched_emp_name wide\">"+employee_data[entry].emp_name_first+"</td>";
        for (weekday in (new Schedule())) {
          output += "<td class=\"sched_time sched\">"+employee_data[entry].work_hours[weekday]+"</td>";
        }
        output += "</tr>\n";
      }
    }
  }
  output += "</tbody></table>\n";
  return output;
};

display_schedule_limits = function(sched) {
  var output = "<table class=\"schedule\"><thead><tr>"
    +   "<td class=\"sched_day sched\">Sun</td>"
    +   "<td class=\"sched_day sched\">Mon</td>"
    +   "<td class=\"sched_day sched\">Tue</td>"
    +   "<td class=\"sched_day sched\">Wed</td>"
    +   "<td class=\"sched_day sched\">Thu</td>"
    +   "<td class=\"sched_day sched\">Fri</td>"
    +   "<td class=\"sched_day sched\">Sat</td></tr>\n"
    + "<tr>"
    +   "<td class=\"sched_date sched\">16</td>"
    +   "<td class=\"sched_date sched\">17</td>"
    +   "<td class=\"sched_date sched\">18</td>"
    +   "<td class=\"sched_date sched\">19</td>"
    +   "<td class=\"sched_date sched\">20</td>"
    +   "<td class=\"sched_date sched\">21</td>"
    +   "<td class=\"sched_date sched\">22</td>"
    + "</tr></thead><tbody><tr>\n";

  for (day in sched) {
    output += "<td class=\"sched_time sched\">"+sched[day]+"</td>";
  }

  output += "</tr></tbody></table>";
  return output;
};

edit_employee = function (emp_ref) {
  var emp_form = new form_view("employee", "Edit Employee");
  emp_form.make_paged();
  emp_form.add_page({
    emp_name:{type:"group_input", label:"Employee Name", elements:{
      emp_name_first:{type:"text_input", label:"First Name"},
      emp_name_mid:{type:"text_input", label:"Middle Initial"},
      emp_name_last:{type:"text_input", label:"Last Name"}}
    },
    emp_phone:{type:"group_input", label:"Phone", elements:{
      emp_phone_cell:{type:"text_input", label:"Cell",},
      emp_phone_alt:{type:"text_input", label:"Alternate"}}
    },
    emp_ecomm:{type:"group_input", label:"Electronic Contact", elements:{
      emp_email:{type:"text_input", label:"Email"},
      emp_twitter:{type:"text_input", label:"Twitter Name"}}
    }
  });
  emp_form.add_page({
    emp_hr:{type:"group_input", label:"Position Details", elements:{
      emp_position:{type:"text_input", label:"Position"},
      emp_trainer:{type:"choice", label:"Trainer"},
      emp_ft:{type:"choice", label:"Full-time"},
      emp_req_hours:{type:"text_input", label:"Requested Hours"},
      emp_rating:{type:"text_input", label:"Employee Rating"},
      emp_hire_date:{type:"text_input", label:"Date Hired"},
      emp_location:{type:"text_input", label:"Location"}}
    }
  });
  /*emp_form.add_page({
    
  });*/

  emp_form.bind_data(emp_ref);

  emp_form.set_callback(function (){
    emp_autocomplete_update();
    $("#employee").hide();
  });

  emp_form.show();
};

//display
var current_idx = new Object();

display_employee = function(employee_name) {
  var employee = $("#employee");
  employee.hide();
  for (entry in employee_data) {
    if (emp_name_full(employee_data[entry]) == employee_name) {
      current_idx = entry;
      $("#emp_name").text(emp_name_full(employee_data[entry]));
      for (data in employee_data[entry]) {
        if (data == "schedule_limits") {
          $("#"+data).html(display_schedule_limits(employee_data[entry][data]));
        } else if (data == "work_hours") {
        }else {
          $("#"+data).text(employee_data[entry][data]);
        }
      }
    }
  }
  employee.show(700);
  $("#f_emp_delete").show();
};

/*=================================================
  Document Onload
  =================================================*/
$(document).ready(function() {
  setMainHandlers();
  $("div.page").hide();
  $("#employees").show(10);




});
