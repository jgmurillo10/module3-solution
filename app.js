(function  () {
	console.log('initial')
	/**
	*  Module
	*
	* Description
	*/
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('BaseApi', 'https://davids-restaurant.herokuapp.com');




	NarrowItDownController.$inject= ['MenuSearchService'];
	function NarrowItDownController  (MenuSearchService) {
	
			var narrow=this;
			narrow.searchTerm='';
			narrow.items=[];
			narrow.rhi="";
			var promise = MenuSearchService.getMatchedMenuItems();
			

			promise
			.then(function (response) {
				console.log(response.data)
				narrow.items=response.data;
			})
			.catch(function (err) {
				console.log(err);
			})
	 };
	MenuSearchService.$inject= ['$http', 'BaseApi'];
	function MenuSearchService ($http, BaseApi) {
	 	var service=this;
	 	service.getMatchedMenuItems= function () {
	 		var response = $http({
	 			method: 'GET',
	 			url: (BaseApi+ '/menu_items.json') 
	 		});
	 		return response;	
	 	}
	 }; 

})();