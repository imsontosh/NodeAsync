function doSomethingOnceAllAreDone() {
    console.log('Everything is done.');
}

function Item(delay) {
    this.delay = delay;
}

Item.prototype.someAsyncCall = function(callback) {
    var temp = this;
    console.log('Item Started', temp.delay);
    setTimeout(function() {
        console.log('Item is done. -------', temp.delay);
        if (typeof callback === 'function') callback();
    }, this.delay);
};

var items = [];
items.push(new Item(1000));
items.push(new Item(200));
items.push(new Item(500));

var async = require('async');
const fse = require('fs-extra');
var asyncTasks = [];
var outPath = './build/';
var name = 'file';
var ext = 'txt';

items.forEach(function(item) {
    asyncTasks.push(function(callback) {
        item.someAsyncCall(function() {
            try {
                fse.outputFileSync(outPath + name + item.delay + '.' + ext, item.delay);
            } catch (error) {
                console.log('Error writing Component file ' + name + ': ' + error);
            }
            callback();
        });
    });
});

async.parallel(asyncTasks, function() {
    doSomethingOnceAllAreDone();
});
