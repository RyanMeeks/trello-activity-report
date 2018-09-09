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
      const fullCurrentDate = moment().format('L');
      const endingYear = fullCurrentDate.slice(6, 10);
      const endingMonth = fullCurrentDate.slice(0, 2);
      const endingDate = fullCurrentDate.slice(3, 5);

      dateFilters.date.startDate = "start/" + "1900" + "-" + "01" + "-" + "01" + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
      const inputFieldFrom = 
      $("input[type=date]").val("");
      dateFilters.displayDate();
    })
  },
  yesterdayFilter: function () {
    $('#js-yesterday').on('click', function() {
      const todaysDate = new Date();
      const yesterdaysDate = moment(todaysDate, 'YYYY/MM/DD').subtract(1, 'days')._d
      let yesterdayMonth = yesterdaysDate.getMonth()+1;
      
      const endingYear = yesterdaysDate.getFullYear();
      const endingMonth = (yesterdayMonth < 10) ? "0" + yesterdayMonth : yesterdayMonth;
      const endingDate = (yesterdaysDate.getDate() < 10) ? "0" + yesterdaysDate.getDate() : yesterdaysDate.getDate();
      
      const startingYear = yesterdaysDate.getFullYear();
      const startingMonth = (yesterdayMonth < 10) ? "0"+yesterdayMonth : yesterdayMonth;
      const startingDate = (yesterdaysDate.getDate() < 10) ? "0" + yesterdaysDate.getDate() : yesterdaysDate.getDate();
      
      dateFilters.date.startDate = "start/" + startingYear + "-" + startingMonth + "-" + startingDate + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
      $("input[type=date]").val("");
      dateFilters.displayDate();
    });     
  },

  last7DaysFilter: function() {
    $('#js-last7Days').on('click', function() {
      const fullCurrentDate = moment().format('L');
      const endingYear = fullCurrentDate.slice(6, 10);
      const endingMonth = fullCurrentDate.slice(0, 2);
      const endingDate = fullCurrentDate.slice(3, 5);
      
      const fullStartDate = moment().subtract(7, 'days').calendar();
      const startingYear = fullStartDate.slice(6, 10);
      const startingMonth = fullStartDate.slice(0, 2);
      const startingDate = fullStartDate.slice(3, 5);
      
      dateFilters.date.startDate = "start/" + startingYear + "-" + startingMonth + "-" + startingDate + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
      $("input[type=date]").val("");
      dateFilters.displayDate();
    })
  },
  last30DaysFilter: function() {
    $('#js-last30Days').on('click', function() {
      const fullCurrentDate = moment().format('L');
      const endingYear = fullCurrentDate.slice(6, 10);
      const endingMonth = fullCurrentDate.slice(0, 2);
      const endingDate = fullCurrentDate.slice(3, 5);
      
      const fullStartDate = moment().subtract(29, 'days').calendar();
      const startingYear = fullStartDate.slice(6, 10);
      const startingMonth = fullStartDate.slice(0, 2);
      const startingDate = fullStartDate.slice(3, 5);
      
      dateFilters.date.startDate = "start/" + startingYear + "-" + startingMonth + "-" + startingDate + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
      $("input[type=date]").val("");
      dateFilters.displayDate();
    })
  },
  last6MonthsFilter: () => {
    $('#js-last6Months').on('click', function() {
      const fullCurrentDate = moment().format('L');
      const endingYear = fullCurrentDate.slice(6, 10);
      const endingMonth = fullCurrentDate.slice(0, 2);
      const endingDate = fullCurrentDate.slice(3, 5);
      
      const fullStartDate = moment().subtract(179, 'days').calendar();
      const startingYear = fullStartDate.slice(6, 10);
      const startingMonth = fullStartDate.slice(0, 2);
      const startingDate = fullStartDate.slice(3, 5);
      
      dateFilters.date.startDate = "start/" + startingYear + "-" + startingMonth + "-" + startingDate + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
      $("input[type=date]").val("");
      dateFilters.displayDate();
    })
  },
  clearFilter: function() {
    $('#js-clearFilter').on('click', function() {
      console.log("clear Filter works")
      $("input[type=date]").val("");
    })
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
  dateFilters.clearFilter();
}
(runOnOpen());
