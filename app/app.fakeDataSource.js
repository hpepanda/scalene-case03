var app = angular.module('hpsa-client');

app.constant('DataSource', {
    ExpenseCategories: [
        'Airfare',
        'Hotel',
        'Taxi',
        'Meal',
        'Restaurant',
        'Misc'
    ],
    Currency: [
        {id: 1, name: 'USD'},
        {id: 2, name: 'UAH'},
        {id: 3, name: 'EUR'},
        {id: 4, name: 'GBP'},
        {id: 5, name: 'Other'}
    ]
});

app.factory('ExpenseMapper',['DataSource', function(DataSource){
    var randomData = function(){
        var randomNumber = Math.floor(Math.random() * 100);

        return {
            currency: DataSource.Currency[randomNumber%5].name,
            hasReceipt: randomNumber & 2 == 1
        };
    };
    return function(expensesArray){
      return expensesArray.map(function(item){
          var data = randomData();
          return {
              _id: item._id,
              date: item.date,
              category: item.category,
              vendor: item.vendor,
              amount: item.amount,
              currency: data.currency,
              receipt: item.receipt,
              hasReceipt: data.hasReceipt,
              isPersonal: false,
              checked: false
          };

      });
    };
}]);