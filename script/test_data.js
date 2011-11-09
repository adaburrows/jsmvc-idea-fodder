/*=================================================
  Test Data
  =================================================*/

function Schedule() {
  this.Monday = new Object();
  this.Tuesday = new Object();
  this.Wednesday = new Object();
  this.Thursday = new Object();
  this.Friday = new Object();
  this.Saturday = new Object();
  this.Sunday = new Object();
}

var positions = [
  "Manager",
  "Owner",
  "The Only Worker"
];

var employee_data = [
{ emp_name_first:"Jillian",
  emp_name_mid:"Ada",
  emp_name_last: "Burrows",
  emp_phone_cell:"+1 503-208-5455",
  emp_phone_alt:"",
  emp_email:"jill@adaburrows.com",
  emp_twitter:"@jburrows",

  emp_position:"Manager",
  emp_trainer:"Yes",
  emp_ft:"Yes",
  emp_req_hours:"160",
  emp_rating:"100",
  emp_hire_date:"",
  emp_location:"",

  emp_avg_hrs:"280",
  emp_sched_reqs:"24",
  emp_sick_days:"90",
  emp_to_reqs_appr:"100",

  schedule_limits:{
      do_not_bind:0,
      Monday:["2p-3p", "4p-5p", "7p-3a"],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]},
  work_hours:{
      Monday:[""],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]}
  },

{ emp_name_first:"Nate",
  emp_name_mid:"A",
  emp_name_last:"Persona",
  emp_phone_cell:"",
  emp_phone_alt:"+1 123-456-7890",
  emp_email:"",
  emp_twitter:"",

  emp_position:"Manager",
  emp_trainer:"Yes",
  emp_ft:"Yes",
  emp_req_hours:"160",
  emp_rating:"100",
  emp_hire_date:"",
  emp_location:"",

  emp_avg_hrs:"280",
  emp_sched_reqs:"24",
  emp_sick_days:"90",
  emp_to_reqs_appr:"100",

  schedule_limits:{
      Monday:["2p-3p", "4p-5p", "7p-3a"],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]},
  work_hours:{
      Monday:[""],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]}
  },

{ emp_name_first:"Herb",
  emp_name_mid:"A",
  emp_name_last:"Herber",
  emp_phone_cell:"+1 123-456-7890",
  emp_phone_alt:"",
  emp_email:"herb@nowhere.net",
  emp_twitter:"",

  emp_position:"The Only Worker",
  emp_trainer:"No",
  emp_ft:"Yes",
  emp_req_hours:"160",
  emp_rating:"100",
  emp_hire_date:"",
  emp_location:"",

  emp_avg_hrs:"280",
  emp_sched_reqs:"24",
  emp_sick_days:"90",
  emp_to_reqs_appr:"100",

  schedule_limits:{
      Monday:["2p-3p", "4p-5p", "7p-3a"],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]},
  work_hours:{
      Monday:[""],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]}
  },

{ emp_name_first:"Damnit",
  emp_name_mid:"",
  emp_name_last:"Janet",
  emp_phone_cell:"+1 123-456-7890",
  emp_phone_alt:"",
  emp_email:"Janet@nowhere.net",
  emp_twitter:"",

  emp_position:"Owner",
  emp_trainer:"Yes",
  emp_ft:"Yes",
  emp_req_hours:"160",
  emp_rating:"100",
  emp_hire_date:"",
  emp_location:"",

  emp_avg_hrs:"280",
  emp_sched_reqs:"24",
  emp_sick_days:"90",
  emp_to_reqs_appr:"100",

  schedule_limits:{
      Monday:["2p-3p", "4p-5p", "7p-3a"],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]},
  work_hours:{
      Monday:[""],
      Tuesday:[""],
      Wednesday:[""],
      Thursday:[""],
      Friday:[""],
      Saturday:[""],
      Sunday:[""]}
  }

];

/* ===========================================================================*/

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

Employee.prototype.emp_name_full = function(emp) {
  var result = emp.emp_name_first;
  if (emp.emp_name_mid != "")
    result += (" " + emp.emp_name_mid);
  if (emp.emp_name_last != "")
    result += (" " + emp.emp_name_last);
  return result;
};


