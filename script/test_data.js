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
  emp_phone_cell:"+1 541-740-4192",
  emp_phone_alt:"+1 541-250-0013",
  emp_email:"Jillian@RepresentaionDesign.net",
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

{ emp_name_first:"Nathaniel",
  emp_name_mid:"",
  emp_name_last:"Weinstein",
  emp_phone_cell:"",
  emp_phone_alt:"+1 541-250-0013",
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

{ emp_name_first:"Sheri",
  emp_name_mid:"",
  emp_name_last:"Dover",
  emp_phone_cell:"",
  emp_phone_alt:"+1 541-250-0013",
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
  emp_name_mid:"",
  emp_name_last:"",
  emp_phone_cell:"+1 541-740-4192",
  emp_phone_alt:"+1 541-250-0013",
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

{ emp_name_first:"Janet",
  emp_name_mid:"",
  emp_name_last:"",
  emp_phone_cell:"+",
  emp_phone_alt:"+1 541-250-0013",
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



