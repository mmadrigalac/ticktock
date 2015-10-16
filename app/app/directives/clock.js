(function(){
	'use strict';

	var app = angular.module('ticktock',[]);

	app.directive('clock', function( $timeout, $filter){
		return{
			restrict: 'A',
			link: function(scope,elem,att){

				scope.time ={};
				scope.newAlarm ={};
				var alarm ={};

				//Actualizacion de reloj 
				function tick(){
					var now = new Date();

					scope.time.hours = $filter('clockView')(now.getHours());
					scope.time.minutes = $filter('clockView')(now.getMinutes());
					scope.time.seconds = $filter('clockView')(now.getSeconds());

					$timeout(function () {
						tick();
					}, 1000);
				}


				//funciones de alarma
				scope.confAlarm = function(){
					scope.openConf = !scope.openConf;
				
					if(scope.openConf){
						if($.isEmptyObject(alarm)){
							scope.newAlarm.hours = parseInt(scope.time.hours);
							scope.newAlarm.minutes = parseInt(scope.time.minutes);
						}
						else{
							scope.newAlarm.hours = parseInt(alarm.hours);
							scope.newAlarm.minutes = parseInt(alarm.minutes);	
						}
					}
				};

				scope.setAlarm = function(newAlarm){
					alarm.hours = $filter('clockView')(newAlarm.hours);
					alarm.minutes = $filter('clockView')(newAlarm.minutes);

					scope.time.alarmSet = true;
					scope.openConf =false;

					checkAlarm();				
				};

				scope.cancelAlarm = function(){
					scope.time.alarmSet = false;
					scope.openConf =false;
				};	

				
				function checkAlarm(){
					if(scope.time.alarmSet){
						if(alarm.hours == scope.time.hours && alarm.minutes == scope.time.minutes){
							var sound = new Audio('app/resources/alarm-clock-sound.mp3');
							sound.play();

							elem.addClass('blink');

							//desactiva la alarma
							scope.time.alarmSet = false;

							$timeout(function(){ //remueve el efecto de parpadeo
								elem.removeClass('blink');
							},15000);
						}
						else{
							$timeout(function(){
								checkAlarm();
							},60000);
						}
					}
				}


				/*LLamada inicial al metodo de reloj*/
				tick();
			},

			templateUrl:'app/views/clock.html'
		};
	});
})();