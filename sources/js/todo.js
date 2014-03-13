// TODO Global
var TODO = window.TODO || {};

/*Todo sample*/
angular.module('todo', [])
	.controller('TodoCtrl', function($scope){
		$scope.todos = [
			{text:'learn bootstrap', status:'done', due: '1/18/2013', cat: 'workplace'},
			{text:'learn angular', status:'unplanned', due: '3/22/2014', cat: 'workplace'},
			{text:'build Todo sample', status:'in_progress', due: '3/18/2014', cat: 'workplace'},
			{text:'learn foudation 2', status:'in_progress', due: '1/15/2014', cat: 'workplace'},
			{text:'learn angular 3', status:'planned', due: '3/11/2014', cat: 'workplace'},
			{text:'build Todo sample 3', status:'done', due: '1/16/2014', cat: 'workplace'},

			{text:'learn foudation', status:'planned', due: '3/22/2013', cat: 'homeplace'},
			{text:'build an angular app 2', status:'planned', due: '4/22/2014', cat: 'homeplace'},
			{text:'learn bootstrap 2', status:'done', due: '1/18/2013', cat: 'homeplace'},
			{text:'learn angular 2', status:'unplanned', due: '1/22/2014', cat: 'homeplace'},
			{text:'build Todo sample 2', status:'in_progress', due: '1/16/2014', cat: 'homeplace'},
			{text:'build an angular app 2', status:'planned', due: '3/17/2014', cat: 'homeplace'},
			{text:'learn bootstrap 3', status:'done', due: '1/18/2013', cat: 'homeplace'},
			{text:'learn foudation 3', status:'in_progress', due: '3/15/2013', cat: 'homeplace'},
			{text:'build an angular app 3', status:'done', due: '4/22/2014', cat: 'homeplace'}
		];
		$scope.todosCurrent = $scope.todos;
	  $scope.addTodo = function() {
		$scope.todos.push({
			text: 	$scope.todoText,
			due: 	$scope.todoDue,
			category: 	$scope.todoCat,
			status: 	$scope.todoStatus
		});
		$scope.todoText = '';
		if($('#modal-todo-add').length > 0) $('#modal-todo-add').modal('hide');
	  };

	  $scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todosCurrent, function(todo) {
		  count += todo.status == 'done' ? 0 : 1;
		});
		return count;
	  };
	  
	  $scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
		  if (!todo.done) $scope.todos.push(todo);
		});
	  };

	  $scope.filter = function(type) {
		$scope.todosCurrent = [];
		angular.forEach($scope.todos, function(todo) {
		  if (todo.cat == type) {
		  	$scope.todosCurrent.push(todo);
		  }
		  $('.nav-cat li').removeClass('active');
		  $('.nav-cat li[data-type="'+ type +'"]').addClass('active');
		});
		//console.log($scope.todosCurrent.length);
	  };
	  $scope.filter('workplace');

	  /*Schedule Metrics*/
	  $scope.metrics = function(type) {
		var count_task_done = 0;
		var count_task_deadline = 0;
		var count_task_overdue = 0;

		var now =  new Date();
		angular.forEach($scope.todosCurrent, function(todo) {

		});
		return (count/$scope.todosCurrent.length) * 100;
	  };
	  

	  $scope.metricsDone = function() {
		var count = 0;
		var now =  new Date();
		angular.forEach($scope.todosCurrent, function(todo) {
		  count += todo.status == 'done' ? 1 : 0;
		});

		// console.log('metricsDone');	
		// console.log(count/$scope.todosCurrent.length);
		return (count/$scope.todosCurrent.length) * 100;
	  };

	  $scope.metricsDeadline = function() {
		var count = 0;
		
		angular.forEach($scope.todosCurrent, function(todo) {
			var now =  new Date();
			var millisecondsPerDay = 24 * 60 * 60 * 1000;
			var nextDay = now.getTime() + millisecondsPerDay*7;
			var arrDate = todo.due.split('/');
			var dueDay = new Date(arrDate[2], arrDate[0]-1, arrDate[1], now.getHours(), now.getMinutes(), now.getSeconds());
			if(dueDay.getTime() <= nextDay) {				
		  		count += todo.status != 'done' ? 1 : 0;
			}
		});	
		// console.log('metricsDeadline');	
		// console.log(count + " - "+ $scope.todosCurrent.length);	
		return (count/$scope.todosCurrent.length) * 100;
	  };

	  $scope.metricsOverdue = function() {
		var count = 0;
		angular.forEach($scope.todosCurrent, function(todo) {
		  	var now =  new Date();
			var arrDate = todo.due.split('/');
			var dueDay = new Date(arrDate[2], arrDate[0]-1, arrDate[1], now.getHours(), now.getMinutes(), now.getSeconds());
			if(dueDay.getTime() <= now) {				
		  		count += todo.status != 'done' ? 1 : 0;
			}  
		});

		//return count;
		return (count/$scope.todosCurrent.length) * 100;
	  };
	});
/*customize module*/
TODO.initElements = function(){
	/*Datepicker*/
	$('.datepicker').datepicker({
		autoclose: true,
		todayBtn: true,	
	    language: "vi"
	});

	/*Checkbox All handel*/
	/*
	$('.chk-list').each(function(index, list){
		list = $(list);
		list.items = list.find('.chk-item');
		list.head = list.find('.chk-all');
		list.update = function(){
			if(list.find('.chk-item').length == list.find('.chk-item:checked').length) {
				list.head.prop('checked', true);
			} else {
				list.head.prop('checked', false);
			}
		};

		list.items.on('change', function(){
			list.update();
		});

		list.head.on('change', function(){
			if($(this).is(':checked')){
				list.items.prop('checked', true);
			} else {
				list.items.prop('checked', false);
			}
		});
		list.update();
	});
	*/
	
	$('.chk-all').on('change', function(){
		var chkName = $(this).attr('name');
		if($(this).is(':checked')){
			$('.chk-item[name="' + chkName +'"]').prop('checked', true);
		} else {
			$('.chk-item[name="' + chkName +'"]').prop('checked', false);
		}
	});

	$('.chk-item').on('change', function(){
		var chkName = $(this).attr('name');
		if($('.chk-item[name="' + chkName +'"]').length == $('.chk-item[name="' + chkName +'"]:checked').length){
			$('.chk-all[name="' + chkName +'"]').prop('checked', true);
		} else {
			$('.chk-all[name="' + chkName +'"]').prop('checked', false);
		}
	});


}
$(document).ready(function(){
	TODO.initElements();
});