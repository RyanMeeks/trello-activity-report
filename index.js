'use strict';
let dateFilter = {
  startDate: function () {
    document.getElementById("start-date").addEventListener("change", function() {
      var input = this.value;
      var dateEntered = new Date(input);
      console.log(input); //e.g. 2015-11-13
      console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
      })
    },
  endDate: function () {
    document.getElementById("end-date").addEventListener("change", function() {
      var input = this.value;
      var dateEntered = new Date(input);
      console.log(input); //e.g. 2015-11-13
      console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
    })
  }
}

dateFilter.startDate();
dateFilter.endDate();