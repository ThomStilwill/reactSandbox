export const exists = (predicate,array) => !!(find(predicate,array));

export const find = (predicate, array) => {
    
    if(!array) {
        return function _find(ls){
            return find(predicate,ls);
        }
    }
    return array.find(predicate);
};

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
};

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
};

export const not = func => { 
    return function _negated() {
        return !func.apply(null,arguments);
    }
};

export const prop = (key,obj) => {
    if (!obj) {
        return function _prop(obj){
            return obj[key];
        }
    }
    return obj[key];
};

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
};

export const tap = (x,fn) => { fn(x);
                  return x; 
};

export const curry = (originalFunction, initialParams = []) => {
    return (...nextParams) => {
        const curriedFunction = (params) => {
            if (params.length === originalFunction.length) {
                return originalFunction(...params);
            }
            return curry(originalFunction, params);
        };
        return curriedFunction([...initialParams, ...nextParams]);
    };
};

export const pipe = (...functions) => (value) => {
    return functions
      .reduce((currentValue, currentFunction) => {
         return currentFunction(currentValue);
      }, value)
};

export const compose = (...functions) => (value) => {
    return functions
        .reduceRight((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value)
};
