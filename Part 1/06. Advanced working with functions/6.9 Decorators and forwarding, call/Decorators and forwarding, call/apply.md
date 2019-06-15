# Decorators and forwarding, call/apply

```js

    function slow(x) {
    // there can be a heavy CPU-intensive job here
    alert(`Called with ${x}`);
    return x;
    }

    function cachingDecorator(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) { // if the result is in the map
        return cache.get(x); // return it
        }

        let result = func(x); // otherwise call func

        cache.set(x, result); // and cache (remember) the result
        return result;
    };
    }

    slow = cachingDecorator(slow);

    alert( slow(1) ); // slow(1) is cached
    alert( "Again: " + slow(1) ); // the same

    alert( slow(2) ); // slow(2) is cached
    alert( "Again: " + slow(2) ); // the same as the previous line

```

```js

    let worker = {
        slow(min, max) {
            alert(`Called with ${min} and ${max}`);
            return min + max;
        }
    };

    function cachingDecorator(func, hash) {
        let cache = new Map();

        return function() {
            let key = hash(arguments);
            if (cache.has(key)) {
                return cache.get(key);
            }
            let result = func.apply(this, arguments);
            cache.set(key, result);
            return result;
        }
    }

    function hash() {
        return `${arguments[0]}, ${arguments[1]}`;
    }

    worker.slow = cachingDecorator(worker.slow, hash);

    alert(worker.slow(2, 4));
    alert(worker.slow(2, 4));


    function work(a, b) {
        alert( a + b ); // work is an arbitrary function or method
    }

    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
        alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }

    function spy(func) {
        function wrapper() {
            wrapper.calls.push([arguments[0],arguments[1]]);
            func(...arguments);
        }
        wrapper.calls = [];
        return wrapper;
    }