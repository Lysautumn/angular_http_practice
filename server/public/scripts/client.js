console.log('JS');

let app = angular.module('FoodApp', []);

app.controller('FoodController', ['$http', function($http) {
    console.log('FoodController has been loaded');

    let self = this;
    self.foodArray = [];

    self.getFood = function () {
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response) {
            console.log('GET response: ', response);
            self.foodArray = response.data;
        });
    };

    self.addFood = function(newFood) {
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
        }).then(function(response) {
            console.log('POST response: ', response);
            self.getFood();
        });
    };

    self.getFood();
}]);
