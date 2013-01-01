"use strict";

module("dispatcher");

test("basic", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register('/foo', function () {
        x.push('foo');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo');
    deepEqual(x, ['foo']);
});
test("multi", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register('/foo', function () {
        x.push('foo');
    });
    d.register('/foo', function () {
        x.push('foo2');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo');
    deepEqual(x, ['foo', 'foo2']);
});
test("regexp", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register(/^\/foo\/([0-9]+)$/, function (id) {
        x.push('foo:' + id);
    });
    d.register('/foo', function () {
        x.push('foo2');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo/3');
    deepEqual(x, ['foo:3']);
});
test(":id", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register('/foo/:id', function (id) {
        x.push('foo:' + id);
    });
    d.register('/foo', function () {
        x.push('foo2');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo/3');
    deepEqual(x, ['foo:3']);
});
test(":id/:id", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register('/foo/:id/:d', function (id, d) {
        x.push('foo:' + id + ":" + d);
    });
    d.register('/foo', function () {
        x.push('foo2');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo/3/hoge');
    deepEqual(x, ['foo:3:hoge']);
});
test("*path", function () {
    var x = [];
    var d = new MicroDispatcher();
    d.register('/foo/*path', function (path) {
        x.push('foo:' + path);
    });
    d.register('/foo', function () {
        x.push('foo2');
    });
    d.register('/bar', function () {
        x.push('bar');
    });
    d.dispatch('/foo/3');
    deepEqual(x, ['foo:3']);
});
