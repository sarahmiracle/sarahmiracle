var deferred = require('deferred');

var b = function(t)
{
    if(t==2000) throw 'error';
}
var a = function(t)
{
    var def = deferred();
    console.log('hasa');
    b(t);
    setTimeout(function(){def.resolve();},t);
    return def.promise;
};

var resd = deferred();
resd.resolve();

resd.promise
(function(){return a(1000);})
(function () {return a(2000);})
(function () {return a(5000);})
(function(){
    var def = deferred();
    console.log("end");
    def.resolve();
    return def.promise;
},function(err){
    var def = deferred();
    console.log("end1");
    def.resolve();
    return def.promise;
})(function(){
    console.log('done');
}).done();
