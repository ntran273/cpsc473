(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  FormHandler.prototype.addSubmitHandler = function (fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });

      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  CheckList.prototype.addClickHandler = function (fn){
    this.$element.on('click', 'input', function(event){
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

})(window);
