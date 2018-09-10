///FOR ACTIVITY FEED API
const ACTION_COUNTS_API = "https://www.gcumedia.com/sample-data/api/reporting/actionCounts/";//everything in table + "date"
const API_TILES_CALL = "https://www.gcumedia.com/sample-data/api/reporting/";
//For Simple API Displays

const dateFilters = {
  date: {
    startDate: "",
    endDate: ""
  },
  displayDate: function () {
    console.log(this.date.startDate, this.date.endDate)
  },
  startDateStringConverter: function(year, month, day){
    this.date.startDate = "start/" + year + "-" + month + "-" + day + "/";
    this.displayDate();
  },
  startDate: function () {
    document.getElementById("js-start-date").addEventListener("change", function() {
      const input = this.value;
      const year = input.slice(0,4);
      const month = input.slice(5,7);
      const date = input.slice(8,10);
      newStartDate = {year, month, date};
      dateFilters.startDateStringConverter(year, month, date);
      dateFilters.dateRangeFilter();
      })
      
    },
  endDate: function () {
    document.getElementById("js-end-date").addEventListener("change", function() {
      const input = this.value;
      const year = input.slice(0,4);
      const month = input.slice(5,7);
      const date = input.slice(8,11);
      
      dateFilters.endDateStringConverter(year, month, date);
      dateFilters.dateRangeFilter();
      newEndDate = {year, month, date};
    })
  },
  dateRangeFilter: function(){
    const start = this.date.startDate;
    const end = this.date.endDate;
    
    const startyear = start.slice(6,10);
    const startMonth = start.slice(11,13 );
    const startDate = start.slice(14,16);
    const totalStartDate = startyear*365 + startMonth*30 + startDate;
    
    const endYear = end.slice(4,8);
    const endMonth = end.slice(9,11);
    const endDate = end.slice(12,14);
    const totalEndDate = endYear * 365 + endMonth * 30 + endDate;
    
    if (totalEndDate < totalStartDate) {
      $('#js-pick-another').show();
        $('#js-pick-another').html('<p>Your "To" date must be after your "From" date</p>');  
        return console.log("error")  
    }
    else {
      $('#js-pick-another').hide();
    }
    $('button').removeClass('btn-outline-primary')
    dateFilters.loaderCircleFunctions();
    dateFilters.tileFiltersFunctions.activeMemberCount(start, end);
    dateFilters.tileFiltersFunctions.licensedMemberCount(start, end);
    dateFilters.tileFiltersFunctions.inactiveMemberCount(start, end);
    dateFilters.tileFiltersFunctions.deletedBoardCount(start, end);
    dateFilters.tileFiltersFunctions.activeBoardCount(start, end);
    dateFilters.tileFiltersFunctions.archivedBoardCount(start, end);
    dateFilters.actionCounts(start, end);
    dateFilters.dateRangeDisplay();

  },
  endDateStringConverter: function(year, month, day){
    this.date.endDate = "end/" + year + "-" + month + "-" + day;
    this.displayDate();
  },
  allTimeFilter: function () {
    $('#js-all-time').on('click', function() {
      $('button').removeClass('btn-outline-primary')
      $('#js-all-time').addClass('btn-outline-primary');
      dateFilters.loaderCircleFunctions();
      const fullCurrentDate = moment().format('L');
      const anotherDate = moment().format('L');
      const endingYear = fullCurrentDate.slice(6, 10);
      const endingMonth = fullCurrentDate.slice(0, 2);
      const endingDate = fullCurrentDate.slice(3, 5);

      dateFilters.date.startDate = "start/" + "1900" + "-" + "01" + "-" + "01" + "/";
      dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;

      $("input[type=date]").val("");
      dateFilters.displayDate();
      dateFilters.dateRangeDisplay();//promise all
      dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    })
  },
  yesterdayFilter: function () {
    $('#js-yesterday').on('click', function() {
      $('button').removeClass('btn-outline-primary')
      $('#js-yesterday').addClass('btn-outline-primary');
      dateFilters.loaderCircleFunctions();
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
      dateFilters.dateRangeDisplay(); 
      dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    });     
  },
  last7DaysFilter: function() {
    $('#js-last7Days').on('click', function() {
      $('button').removeClass('btn-outline-primary')
      $('#js-last7Days').addClass('btn-outline-primary');
      dateFilters.loaderCircleFunctions();
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
      dateFilters.dateRangeDisplay();
      dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    })
  },
  last30DaysFilter: function() {
    $('#js-last30Days').on('click', function() {
      $('button').removeClass('btn-outline-primary')
      $('#js-last30Days').addClass('btn-outline-primary');
      dateFilters.loaderCircleFunctions();
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
      dateFilters.dateRangeDisplay();
      dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    })
  },
  last6MonthsFilter: () => {
    $('#js-last6Months').on('click', function() {
      dateFilters.loaderCircleFunctions();
      $('button').removeClass('btn-outline-primary');
      $('#js-last6Months').addClass('btn-outline-primary');

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
      dateFilters.dateRangeDisplay();
      

      dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
      dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    })
  },
  clearFilter: function() {
    $('#js-clearFilter').on('click', function() {
      $('button').removeClass('btn-outline-primary')
      $("input[type=date]").val("");
    })
  },
  tileFiltersFunctions: {
    activeMemberCount: function(start, end) {
      $('#js-members').empty();
      const settings = ({
        url: `${API_TILES_CALL}activeMemberCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          $('#js-members').html(`<h2>${data.activeMemberCount}</h2>`)
          $('#js-members').removeClass("loader")

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    },
    licensedMemberCount: function(start, end) {
      $('#js-licensed-users').empty();
      const settings = ({
        url: `${API_TILES_CALL}licensedMemberCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          $('#js-licensed-users').html(`<h2>${data.licensedMemberCount}</h2>`);
          $('#js-licensed-users').removeClass("loader");

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    },
    inactiveMemberCount: function(start, end) {
      $('#js-inactive-users').empty();
      const settings = ({
        url: `${API_TILES_CALL}inactiveMemberCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          $('#js-inactive-users').html(`<h2>${data.inactiveMemberCount}</h2>`);
          $('#js-inactive-users').removeClass("loader");

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    },
    deletedBoardCount: function(start, end) {
      $('#js-deleted-boards').empty();
      const settings = ({
        url: `${API_TILES_CALL}deletedBoardCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          $('#js-deleted-boards').html(`<h2>${data.deletedBoardCount}</h2>`);
          $('#js-deleted-boards').removeClass("loader");

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    },
    activeBoardCount: function(start, end) {
      $('#js-active-boards').empty();
      const settings = ({
        url: `${API_TILES_CALL}activeBoardCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          const active = $('#js-active-boards').html(`<h2>${data.activeBoardCount}</h2>`);
          $('#js-active-boards').removeClass("loader");

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    },
    archivedBoardCount: function(start, end) {
      $('#js-archived-boards').empty();
      const settings = ({
        url: `${API_TILES_CALL}archivedBoardCount/${start}${end}`,
        type: 'GET',
        success: function(data){
          $('#js-archived-boards').html(`<h2>${data.archivedBoardCount}</h2>`)
          $('#js-archived-boards').removeClass("loader");

        },
        error: function(e) {
          console.log("error retrieving data");
        }
      })
      $.ajax(settings)
    }
  },
  loaderCircleFunctions: function () {
    $('#js-members').addClass("loader");
    $('#js-licensed-users').addClass("loader");
    $('#js-inactive-users').addClass("loader");
    $('#js-deleted-boards').addClass("loader");
    $('#js-active-boards').addClass("loader");
    $('#js-archived-boards').addClass("loader");
    $('#js-activity-type').addClass("loader");
  },
  actionCounts: function(start, end) {
    $('#loading-report').show();
    $('.row-data').html("<p>Loading...<p>")
    
    const settings = ({
      url: `${ACTION_COUNTS_API}${start}${end}`,
      type: 'GET',
      success: function(data) {
        let table = `
        <tr>
          <th scope="row">Comments</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.commentCard}</td>
        </tr>
        <tr>
          <th scope="row">Cards Created</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.createCard}</td>
        </tr>
        <tr>
          <th scope="row">Cards Moved</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.moveCardFromBoard}</td>
        </tr>
        <tr>
          <th scope="row">Cards Duplicated</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.copyCommentCard}</td>
        </tr>
        <tr>
          <th scope="row">Cards Archived</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.moveCardFromBoard}</td>
        </tr>
        <tr>
          <th scope="row">Cards Deleted</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.deleteCard}</td>
        </tr>
        <tr>
          <th scope="row">Lists Created</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.createList}</td>
        </tr>
        <tr>
          <th scope="row">Lists Moved</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.moveListFromBoard}</td>
        </tr>
        <tr>
          <th scope="row">Lists Duplicated</th>
          <td class="row-data" style="text-align:right">No Value in JSON</td>
        </tr>
        <tr>
          <th scope="row">Lists Archived</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.moveListFromBoard}</td>
        </tr>
        <tr>
          <th scope="row">Lists Deleted</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.moveListFromBoard}</td>
        </tr>
        <tr>
          <th scope="row">Unique Labels</th>
          <td class="row-data" style="text-align:right">${data.actionCounts.updateList}</td>
        </tr>
        `
        Promise.all([table]).then(function(values) {
          $('#loading-report').hide();
          $('#js-activity-table').html(`${table}`)
        });
      },
      error: function(e) {
        console.log("error retrieving data");
      }
    })
    $.ajax(settings)
  },
  dateRangeDisplay: function() {
    const startDate = this.date.startDate;
    const endDate = this.date.endDate;
    const startingDate = startDate.slice(14, 16);
    const startingMonth = startDate.slice(11, 13);
    const startingYear = startDate.slice(6, 10);
    const startingString = startingMonth + "-" + startingDate + "-" + startingYear;

    const endingDate = endDate.slice(12, 14);
    const endingMonth = endDate.slice(9, 11);
    const endingYear = endDate.slice(4, 8);
    const endingString = endingMonth + "-" + endingDate + "-" + endingYear;
    
    $(".js-start-date-range").html(`<span>${startingString}</span>`);
    $(".js-end-date-range").html(`<span>${endingString}</span>`);
  },
  startAllTimeFilter: function () {
    $('button').removeClass('btn-outline-primary');
    $('#js-all-time').addClass('btn-outline-primary');
    
    const fullCurrentDate = moment().format('L');
    const endingYear = fullCurrentDate.slice(6, 10);
    const endingMonth = fullCurrentDate.slice(0, 2);
    const endingDate = fullCurrentDate.slice(3, 5);
    dateFilters.date.startDate = "start/" + "1900" + "-" + "01" + "-" + "01" + "/";
    dateFilters.date.endDate = "end/" + endingYear + "-" + endingMonth + "-" + endingDate;
    
    
    dateFilters.displayDate();
    dateFilters.dateRangeDisplay();
    dateFilters.tileFiltersFunctions.activeMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.tileFiltersFunctions.licensedMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.tileFiltersFunctions.inactiveMemberCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.tileFiltersFunctions.deletedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.tileFiltersFunctions.activeBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.tileFiltersFunctions.archivedBoardCount(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.actionCounts(dateFilters.date.startDate, dateFilters.date.endDate);
    dateFilters.loaderCircleFunctions();
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
  dateFilters.dateRangeFilter();
  dateFilters.startAllTimeFilter();
}

runOnOpen();