
    export const exists = (predicate,list ) =>  {
        return list.some(predicate);
    }

    export const find = (predicate, list) => {
        
        if(!list) {  //build in curry
            return function _find(ls){
                return find(predicate,ls);
            }
        }

        var i = 0;
        while( i< list.length){
            if(predicate(list[i])){
                return list[i];
            }
            i++;
        }
    }

    export const traverse = (predicate,obj) => {
        if(Object(obj) !== obj){
            return null;
        }

        if(predicate(obj)){
            return obj;
        }

        for(var i in obj) {
            if(obj.hasOwnProperty(i)) {
                let result = traverse(predicate,obj[i]);
                if(result){
                    return result;
                }
            }
        }
    }

    export const where = (spec,test) => {
        if (!test) {
            return function _where(tst) {
                return where (spec,tst);
            }
        }
        for(var k in spec){
            if(spec.hasOwnProperty(k)){
                if (spec[k] !== test[k]){
                    return false;
                }
            }
        }
        return true;
    }

    export const not = f=> { 
        return function _negated() {
            return !f.apply(null,arguments);
        }
    }

    export const prop = (key,obj) => {
        if (!obj) {
            return function _prop(obj){
                return obj[key];
            }
        }
        return obj[key];
    }

    export const path = (pathstring,obj) => {
        var i = 0;
        var tmp = obj;
        var props = pathstring.split('.');
        
        while(i < props.length){
            if(tmp[props[i]] === undefined){
                return tmp[props[i]];
            }
            tmp = tmp[props[i]];
            i += 1;
        }
        return tmp;
    }

    export const tap = (fn) => (x) => {
                        fn(x);
                        return x;
                    }

    // curry = (f, arr = []) => (...args) => (
    //                     a => a.length === f.length ?
    //                       f(...a) :
    //                       curry(f, a)
    //                   )([...arr, ...args]);

    export const curry = (originalFunction, initialParams = []) => {
        //debugger;
        return (...nextParams) => {
            //debugger;
            const curriedFunction = (params) => {
                //debugger;
                if (params.length === originalFunction.length) {
                    return originalFunction(...params);
                }
                return curry(originalFunction, params);
            };
            return curriedFunction([...initialParams, ...nextParams]);
        };
    };

    //pipe = (...fns) => x => fns.reduce((v, f) => f(v), x) 
    export const pipe = (...functions) => (value) => {
        //debugger;
        return functions
        .reduce((currentValue, currentFunction) => {
            //debugger;
            return currentFunction(currentValue);
        }, value)
    }

    //compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    export const compose = (...functions) => (value) => {
        //debugger;
        return functions
            .reduceRight((currentValue, currentFunction) => {
                //debugger;
                return currentFunction(currentValue);
            }, value)
    }
