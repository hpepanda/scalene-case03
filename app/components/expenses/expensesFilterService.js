angular.module('hpsa-client')
    .factory('ExpensesFilterProvider', function(){

        var _from = new Date();
        var _to = new Date();
        _from.setDate(_to.getDate() - 7);

        var resetHours = function(date){
            date.setHours(0, 0, 0, 0);
            return date;
        };

        return {

            defaultFrom: _from,

            defaultTo: _to,
            
            normalizeFrom: function(date){
                return resetHours(date);
            },

            normalizeTo: function(date){
                var to = new Date(date.getTime());
                to.setDate(to.getDate() + 1);   
                return resetHours(to);
            }
        };
    });