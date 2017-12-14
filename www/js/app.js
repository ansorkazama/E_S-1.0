angular.module("aplikasi_e_schedule", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","aplikasi_e_schedule.controllers", "aplikasi_e_schedule.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Aplikasi E-Schedule" ;
		$rootScope.appLogo = "data/images/header/logo_diskominfo_sumatera_utara.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				var confirmPopup = $ionicPopup.confirm({
					title: "Confirm Exit",
					template: "Are you sure you want to exit?"
				});
				confirmPopup.then(function (close){
					if(close){
						ionic.Platform.exitApp();
					}
				});
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?google\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("aplikasi_e_schedule",{
		url: "/aplikasi_e_schedule",
			abstract: true,
			templateUrl: "templates/aplikasi_e_schedule-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("aplikasi_e_schedule.about_us", {
		url: "/about_us",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.faqs", {
		url: "/faqs",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.gallery", {
		url: "/gallery",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-gallery.html",
						controller: "galleryCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.help", {
		url: "/help",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-help.html",
						controller: "helpCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.kegiatan", {
		url: "/kegiatan",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-kegiatan.html",
						controller: "kegiatanCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.menu_2", {
		url: "/menu_2",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-menu_2.html",
						controller: "menu_2Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.pengumuman", {
		url: "/pengumuman",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-pengumuman.html",
						controller: "pengumumanCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aplikasi_e_schedule.program", {
		url: "/program",
		views: {
			"aplikasi_e_schedule-side_menus" : {
						templateUrl:"templates/aplikasi_e_schedule-program.html",
						controller: "programCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/aplikasi_e_schedule/dashboard");
});
