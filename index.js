const ACTION_COUNTS_API = "https://www.gcumedia.com/sample-data/api/reporting/actionCounts/"//everything in table + "date"

const dateFilters = {
  date: {
    startDate: "start/2017-01-01/",
    endDate: "end/2017-02-01"
  },
  displayDate: function () {
    console.log(this.date.startDate, this.date.endDate)
  },
  startDateStringConverter: function(start){
    const year = start.slice(0,4);
    const day = start.slice(5, 7);
    const month = start.slice(8, 10)
    this.date.startDate = "start/" + year + "-" + month + "-" + day + "/";
    this.displayDate();
  },
  startDate: function () {
    document.getElementById("js-start-date").addEventListener("change", function() {
      const input = this.value;
      dateFilters.startDateStringConverter(input);
      })  
    },
  endDate: function () {
    document.getElementById("js-end-date").addEventListener("change", function() {
      const input = this.value;
      dateFilters.endDateStringConverter(input);
    })
  },
  endDateStringConverter: function(start){
    const year = start.slice(0,4);
    const day = start.slice(5, 7);
    const month = start.slice(8, 10)
    this.date.endDate = "end/" + year + "-" + month + "-" + day;
    this.displayDate();
  },
  allTimeFilter: function () {
    $('#js-all-time').on('click', function() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const date = currentDate.getDate();
      const formattedDate = (date < 10) ? ('0' + date).slice(-2) : date;
      const month = currentDate.getMonth() + 1;
      const parseMonth = (month < 10) ? ('0' + month).slice(-2) : month;
      dateFilters.date.startDate = "start/" + "1900" + "-" + "01" + "-" + "01" + "/";
      dateFilters.date.endDate = "end/" + year + "-" + parseMonth + "-" + formattedDate;
      dateFilters.displayDate();
    })
  },
  yesterdayFilter: function () {
    $('#js-yesterday').on('click', function() {
      const currentDate = new Date();
      let year = currentDate.getFullYear();
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      if (date === 1) {
        if (month === 12) {
          date = 30;
          month = 11;
        }
        else if (month === 11) {
          date = 31;
          month = 10;
        }
        else if (month === 10) {
          date = 30;
          month = 9;
        }
        else if (month === 9) {
          date = 31;
          month = 8;
        }
        else if (month === 8) {
          date = 31;
          month = 7;
        }
        else if (month === 7) {
          date = 30;
          month = 6
        }
        else if (month === 6) {
          date = 31;
        }
        else if (month === 5) {
          date = 30;
        }
        else if (month === 4) {
          date = 31;
        }
        else if (month === 3) {
          (year % 4 === 0) ? date = 29 : date = 28;
        }
        else if (month === 2) {
          (year % 4 === 0) ? date = 29 : date = 28; //leap year
        }
        else if (month === 1) {
          date = 31;
          month = 12;
          year--
        }
      } else {
        date = date - 1;
      }
      const parseMonth = dateFilters.parseData.parseMonth(month);
      const formattedDate = dateFilters.parseData.parseDate(date);
      dateFilters.date.startDate = "start/" + year + "-" + parseMonth + "-" + formattedDate + "/";
      dateFilters.date.endDate = "end/" + year + "-" + parseMonth + "-" + formattedDate;
      dateFilters.displayDate();
    })
  },
  last7DaysFilter: function() {
    $('#js-last7Days').on('click', function() {
      console.log("js-last7Days works")
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let date = currentDate.getDate();
      if (date < 7) {
        if (month === 12) {
          date = 30 - 6 + date;
          month--;
        }
        else if (month === 11) {
          date = 31 - 6 + date;
          month--;
        }
        else if (month === 10) {
          date = 30 - 6 + date;
          month--;
        }
        else if (month === 9) {
          date = 31 - 6 + date;
          month--;
        }
        else if (month === 8) {
          date = 31 - 6 + date;
          month--;
        }
        else if (month === 7) {
          date = 30 - 6 + date;
          month--;
        }
        else if (month === 6) {
          date = 31 - 6 + date;
          month--;
        }
        else if (month === 5) {
          date = 30 - 6 + date;
          month--;
        }
        else if (month === 4) {
          date = 31 - 6 + date;
          month--;
        }
        else if (month === 3) {
          (year % 4 === 0) ? date = 29 - 6 + date : date = 28 - 6;
          month--;
        }
        else if (month === 2) {
          date = 31 - 6 + date;
          month--;//leap year
        }
        else if (month === 1) {
          date = 31 - 6 + date;
          year = year--;
          month = 12;
        }
      } else {
        date = date - 6;
      }

      const dateMinus7 = (date < 30) ? ('0' + date).slice(-2) : date;
      const parseMonth = dateFilters.parseData.parseMonth(month)
      
      dateFilters.date.startDate = "start/" + year + "-" + parseMonth + "-" + dateMinus7 + "/";
      dateFilters.date.endDate = "end/" + year + "-" + dateFilters.parseData.parseMonth(currentDate.getMonth()+1) 
        + "-" + dateFilters.parseData.parseDate(currentDate.getDate());
      dateFilters.displayDate();
    })
  },
  last30DaysFilter: function() {//NEEDS WORK
    $('#js-last30Days').on('click', function() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      if (date < 30) {
        if (month === 12) {
          date = 30 - 29 + date;
          month--;
        }
        else if (month === 11) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 10) {
          date = 30 - 29 + date;
          month--;
        }
        else if (month === 9) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 8) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 7) {
          date = 30 - 29 + date;
          month--;
        }
        else if (month === 6) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 5) {
          date = 30 - 29 + date;
          month--;
        }
        else if (month === 4) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 3) {
          (year % 4 === 0) ? date = 29 - 30 + date : date = 28 - 30;
          month--;
        }
        else if (month === 2) {
          date = 31 - 29 + date;
          month--;
        }
        else if (month === 1) {
          date = 31 - 30 + date;
          month = 12;
          year--;
        }
      } else {
        date = date - 29;
      }
      dateFilters.date.startDate = "start/" + year + "-" + dateFilters.parseData.parseMonth(month) + "-" + dateFilters.parseData.parseDate(date) + "/";
      dateFilters.date.endDate = "end/" + year + "-" + dateFilters.parseData.parseMonth(currentDate.getMonth() + 1) + "-" + dateFilters.parseData.parseDate(currentDate.getDate());
      dateFilters.displayDate();
    })
  },
  parseData: {
    parseMonth: function(month) {return (month < 10) ? ('0' + month).slice(-2) : month;},
    parseDate: function(date) {return (date < 10) ? ('0' + date).slice(-2) : date;}
  }
}

function runOnOpen() {
  dateFilters.startDate();
  dateFilters.endDate();
  dateFilters.allTimeFilter();
  dateFilters.yesterdayFilter();
  dateFilters.last7DaysFilter();
  dateFilters.last30DaysFilter();
  dateFilters.last6MonthsFilter();
}
(runOnOpen());
