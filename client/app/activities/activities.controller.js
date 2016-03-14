'use strict';

(function() {

  class ActivitiesController {
    constructor(Activities) {
      this.Activities = Activities;
      // Use the Activities $resource to fetch all activities
      this.activities = Activities.query();
      this.showList = true;
      this.showAddForm = false;
      this.showUpdateForm = false;
      this.newActivity = {};
      this.updateActivity = {};
      this.alerts = [];
    }

    search() {
      this.submitted = true;

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
      this.Activities.query({
        from: from,
        to: to
      }).$promise
      .then((activities) => {
        // success
        this.activities = activities;
        this.submitted = false;
      })
      .catch(err => {
        err = err.data;

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error) => {
          this.alerts.push({
            type: 'danger',
            msg: error
          });
        });
      });
    }

    add(form) {
      this.submitted = true;
      this.alerts.length = 0;

      if (form.$valid) {
        var date = this.newActivity.activityDate.toISOString().split('T')[0];
        this.Activities.save({
          activityDate: date,
          distance: Number.parseFloat(this.newActivity.distance),
          duration: Number.parseFloat(this.newActivity.duration)
        }).$promise
        .then(() => {
          // success
          this.search();
          this.toggleAddForm();
          this.submitted = false;
          this.newActivity = {};
          this.alerts.length = 0;
          this.alerts.push({
            type: 'success',
            msg: 'Activity added successfully.'
          });
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

    update(form) {
      this.submitted = true;
      this.alerts.length = 0;

      if (form.$valid) {
        var date = this.updateActivity.activityDate.toISOString().split('T')[0];
        this.Activities.update({id: this.updateActivity._id},{
          activityDate: date,
          distance: Number.parseFloat(this.updateActivity.distance),
          duration: Number.parseFloat(this.updateActivity.duration)
        }).$promise
        .then(() => {
          // success
          this.search();
          this.toggleUpdateForm();
          this.submitted = false;
          this.alerts.length = 0;
          this.alerts.push({
            type: 'success',
            msg: 'Activity updated successfully.'
          });
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

    toggleAddForm() {
      this.showList = !this.showList;
      this.showAddForm = !this.showAddForm;
    }

    toggleUpdateForm() {
      this.showList = !this.showList;
      this.showUpdateForm = !this.showUpdateForm;
      this.updateActivity = {};
    }

    goToUpdate(activity) {
      this.alerts.length = 0;
      this.toggleUpdateForm();
      this.updateActivity._id = activity._id;
      this.updateActivity.duration = activity.duration;
      this.updateActivity.distance = activity.distance;
      this.updateActivity.activityDate = new Date(activity.activityDate);
    }

    closeAlert(index) {
      this.alerts.splice(index, 1);
    }

    delete(activity) {
      activity.$remove();
      this.activities.splice(this.activities.indexOf(activity), 1);
      this.alerts.push({
        type: 'success',
        msg: 'Activity removed successfully.'
      });
    }
  }

  angular.module('trackerApp')
    .controller('ActivitiesController', ActivitiesController);

})();
