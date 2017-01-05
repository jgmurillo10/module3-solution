(function  () {
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('BaseApi', 'https://davids-restaurant.herokuapp.com')
	.directive('foundItems', FoundItemsDirective);

	//directive
	function FoundItemsDirective () {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope:{
				found: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};
		// body...
		return ddo; 
	}
	function FoundItemsDirectiveController () {
		// body... 
		var list=this;
		list.isEmpty=function () {
			/* body... */
			return list.found != undefined && list.found.length===0;
		}
	}

	// Cotroller
	NarrowItDownController.$inject= ['MenuSearchService'];
	function NarrowItDownController  (MenuSearchService) {
	
			var narrow=this;

			narrow.searchTerm = '';
			narrow.narrowIt=function () {
				if(narrow.searchTerm===''){
					narrow.items=[];

					return;
				}	
				var promise= MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
				promise
				.then(function (response) {
					narrow.items=response;
				})
				.catch(function (err) {
					console.log('Something went wrong!!', err);
				});
			};
			narrow.removeItem=function (index) {
				narrow.items.splice(index,1);
			};

		
	 };



	// Service
	MenuSearchService.$inject= ['$http', 'BaseApi'];
	function MenuSearchService ($http, BaseApi) {
			var service=this;
			service.getMatchedMenuItems = function (searchTerm) {
				return $http({
					method: 'GET',
					url: (BaseApi+'/menu_items.json')
				}).then(function (result) {
					var items = result.data.menu_items;
					var foundItems= [];

					for (var i = 0; i < items.length; i++) {
						if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())>=0){
							foundItems.push(items[i]);
						}
					}
					return foundItems;
				});
			};
	 }; 

})();