

class Validation {

    static validators = {
        required() {
            return {
                test: value=> { return !!value },
                message: 'Required.',
                break: true
            }        
        },

        minLength(min) {
            return {
               test: value=> { return !!value && value.length >= min },
               message: `Minmum length is ${min} characters.`
            }
        },

        range(min,max) {
            return {
               test: value=> { 
                    if(!value) {
                        return true
                    }
                    if(!!min && value < min) {
                        return false;
                    }
                    if(!!max && value > max){
                        return false;
                    }
                    return true;
                },
                message: `Value must be between ${min} and ${max}.`
            }
        }
    }
}

export default Validation