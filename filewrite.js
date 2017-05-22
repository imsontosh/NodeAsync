function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function Item(delay){
    this.delay = delay;
}

Item.prototype.someAsyncCall = function(callback){
    var temp = this;
    console.log('Item Started', temp.delay);
    setTimeout(function(){
        console.log("Item is done. -------",temp.delay);
        if(typeof callback === "function") callback();
    }, this.delay);
};

var items = [];
items.push(new Item(1000));
items.push(new Item(200));
items.push(new Item(500));


var async = require("async");
 
var asyncTasks = [];
 
items.forEach(function(item){
  asyncTasks.push(function(callback){
    item.someAsyncCall(function(){
        console.log("Item is done. -------",item.delay);
        callback();
    });
  });
});
 
async.parallel(asyncTasks, function(){
  doSomethingOnceAllAreDone();
});