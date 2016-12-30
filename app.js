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
			console.log('hola')
			narrow.found=[];
			
			found = MenuSearchService.getMatchedMenuItems();
			
			console.log(found[0])
		
	 };
	MenuSearchService.$inject= ['$http', 'BaseApi'];
	function MenuSearchService ($http, BaseApi) {
		var service=this;
		service.getMatchedMenuItems= function () {

				return $http({
				method: 'GET',
				url: (BaseApi + '/menu_items.json')
			})
			.then(function (result) {
			    // process result and only keep items that match
			    var foundItems= result.data;
			    console.log(foundItems)
			    // return processed items
			    return foundItems;
			});
		}
		
	 }; 

})();