'use strict';

(function() {

  class ReportsController {
    constructor(Reports) {
      this.Reports = Reports;
      // Use the Reports $resource to fetch all activities
    }

    search(form) {
      this.submitted = true;

      if (form.$valid) {
        var from = null;
        var to = null;
        var temp;
        if (this.searchParams && this.searchParams.from) {
          temp = new Date(this.searchParams.from);
          temp.setDate(temp.getDate() + 1);
          from = temp.toISOString().split('T')[0];
        }
        if (this.searchParams && this.searchParams.to) {
          temp = new Date(this.searchParams.to);
          temp.setDate(temp.getDate() + 1);
          to = temp.toISOString().split('T')[0];
        }
        this.Reports.get({
          from: from,
          to: to
        }).$promise
          .then((report) => {
          // success
          this.report = report;
          this.submitted = false;
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
      }
    }

  }

  angular.module('trackerApp')
    .controller('ReportsController', ReportsController);

})();
