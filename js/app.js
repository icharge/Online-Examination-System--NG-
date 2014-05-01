var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment']);

app.config(function($routeSegmentProvider, $routeProvider) {
	
	// Configuring provider options
	
	$routeSegmentProvider.options.autoLoadTemplates = true;
	
	// Setting routes. This consists of two parts:
	// 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
	// 2. traversing through segment tree to set it up
  
	$routeSegmentProvider
	
		.when('/',							'frontend.home')
		//.when('/:id',      'frontend.itemInfo.tab1')
		//.when('/:id/X',    'frontend.itemInfo.tab1')
		//.when('/:id/Y',    'frontend.itemInfo.tab2')
		
		.when('/teacher',					'tea.home')
		.when('/teacher/course',			'tea.course')
		.when('/teacher/course/add',		'tea.course.add')
		.when('/teacher/course/edit/:id',	'tea.course.edit')
		.when('/teacher/course/:id',		'tea.course.item')
		//.when('/teacher/course/remove',	'tea.course.remove')

		
		.when('/student',					'std')
		.when('/student/course',			'std.course')
		.when('/student/course/:id',		'std.courseitem')
		//.when('/student/course/:id/enroll',	'std.enroll')
		//.when('/student/course/:id/leave',	'std.leave')
		
		.segment('frontend', {
			templateUrl: 'view/frontend.html',
			controller: MainCtrl,
			resolveFailed: {
				templateUrl: 'view/error.html',
				controller: 'ErrorCtrl'
			},
			untilResolved: {
				templateUrl: 'view/loading.html'
			}
		})
		.within()
			.segment('home', {
				templateUrl: 'view/frontend/home.html'})
			.segment('itemInfo', {
				templateUrl: 'view/frontend/item.html',
				controller: Section1ItemCtrl,
				dependencies: ['id']})
			.within() // ??????????????
				.segment('tab1', {
					templateUrl: 'view/frontend/tabs/tab1.html'})
				.segment('tab2', {
					templateUrl: 'view/frontend/tabs/tab2.html'})
			.up() //end home.*
		.up() // end frontend.*

		.segment('tea', {
			templateUrl: 'view/teacher.html',
			controller: MainCtrl,
			resolveFailed: {
				templateUrl: 'view/error.html',
				controller: 'ErrorCtrl'
			},
			untilResolved: {
				templateUrl: 'view/loading.html'
			}
		})
		.within()
			.segment('home', {
				templateUrl: 'view/teacher/home.html',
				//controller: 
				resolveFailed: {
					templateUrl: 'view/error.html',
					controller: 'ErrorCtrl'
				},
				untilResolved: {
					templateUrl: 'view/loading.html'
				}
			})
			.segment('course', {
				templateUrl: 'view/teacher/course.html',
				//controller: 
				resolveFailed: {
					templateUrl: 'view/error.html',
					controller: 'ErrorCtrl'
				},
				untilResolved: {
					templateUrl: 'view/loading.html'
				}
			})
			.within()
				.segment('item', {
					templateUrl: 'view/teacher/course/item.html',
					dependencies: ['id'],
					resolveFailed: {
						templateUrl: 'view/error.html',
						controller: 'ErrorCtrl'
					},
					untilResolved: {
						templateUrl: 'view/loading.html'
					}
				})
				.segment('add', {
					templateUrl: 'view/teacher/course/add.html'
				})
				.segment('edit', {
					templateUrl: 'view/teacher/course/edit.html',
					dependencies: ['id']
				})
			.up()
		.up()
		.segment('std', {
			templateUrl: 'view/student.html'
			//controller: 
		})
		.within()
			.segment('course', {
				templateUrl: 'view/student/course.html'
			})
			//
		.up()
		
			
	// Also, we can add new item in a deep separately. This is useful when working with
	// routes in every module individually
			
	$routeSegmentProvider
	
		.when('/section1/:id/Z',    's1.itemInfo.tab3')  
		
		.within('s1')
			.within('itemInfo')
				.segment('tab3', {
					templateUrl: 'view/section1/tabs/tab3.html'})
					
					
	// This is some usage of `resolve`, `untilResolved` and `resolveFailed` features
					
	$routeSegmentProvider
	
		.when('/invalid-template', 's1.invalidTemplate')
		.when('/invalid-data', 's1.invalidData')
		.when('/slow-data', 's1.slowDataSimple')
		.when('/slow-data-loading', 's1.slowDataLoading')
		.when('/inline-view', 's1.inlineParent.inlineChildren')
		.when('/:id/slow',    'frontend.itemInfo.tabSlow')
		
		.within('frontend')
			.segment('invalidTemplate', {
				templateUrl: 'this-does-not-exist.html',    // 404
				resolveFailed: {
					templateUrl: 'view/error.html',
					controller: 'ErrorCtrl'
				}
			})
			.segment('invalidData', {
				templateUrl: 'view/section1/home.html',     // Correct!
				resolve: {
					data: function($q) {
						return $q.reject('ERROR DESCRIPTION');     // Failed to load data
					}
				},
				resolveFailed: {
					templateUrl: 'view/error.html',
					controller: 'ErrorCtrl'
				},
				untilResolved: {
					templateUrl: 'view/loading.html'
				}
			})
			.segment('slowDataSimple', {
				templateUrl: 'view/section1/slow-data.html',
				controller: 'SlowDataCtrl',
				resolve: {
					data: function($timeout, loader) {
						loader.show = true;
						return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
					}
				}
			})
			.segment('slowDataLoading', {
				templateUrl: 'view/section1/slow-data.html',
				controller: 'SlowDataCtrl',
				resolve: {
					data: function($timeout) {
						return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
					}
				},
				untilResolved: {
					templateUrl: 'view/loading.html'
				}
			})
			.segment('inlineParent', {
				templateUrl: 'view/section1/inline-view.html'
			})
			.within()
				.segment('inlineChildren', {
					// no template here
					controller: 'SlowDataCtrl',
					resolve: {
						data: function($timeout) {
							return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
						}
					},
					untilResolved: {
						templateUrl: 'view/loading.html'
					}
				})
				.up()

			.within('itemInfo')
				.segment('tabSlow', {
					templateUrl: 'view/section1/slow-data.html',
					controller: 'SlowDataCtrl',
					resolve: {
						data: function($timeout) {
							return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
						}
					},
					untilResolved: {
						templateUrl: 'view/loading.html'
					}
				})

				
		
		
	$routeProvider.otherwise({redirectTo: '/'}); 
}) ;

app.value('loader', {show: false});

function MainCtrl($scope, $routeSegment, loader) {

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = false;
	})
}

function Section1Ctrl($scope, $routeSegment) {
	
	$scope.$routeSegment = $routeSegment;
	$scope.test = { btnClicked: false };
	$scope.items = [ 1,2,3,4,5 ];
}

function Section1ItemCtrl($scope, $routeSegment) {

	$scope.$routeSegment = $routeSegment;
	$scope.item = { id: $routeSegment.$routeParams.id };
	$scope.test = { textValue: '' };
}

function Section2Ctrl($scope, $routeSegment) {

	$scope.$routeSegment = $routeSegment;
	$scope.test = { textValue: '' };
	$scope.items = [ 1,2,3,4,5,6,7,8,9 ];
}

function ErrorCtrl($scope, error) {
	$scope.error = error;
}

function SlowDataCtrl($scope, data, loader) {
	loader.show = false;
	$scope.data = data;
}

