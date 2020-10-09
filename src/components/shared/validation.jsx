

class Validation {

    static validators = {
        required() {
            return {
                test: value=> { return !!value },
                message: 'Required.'
            }        
        },

        minLength(min) {
            return {
               test: value=> { return !!value && value.length >= min },
               message: `Minmum length is ${min} characters.`
            }
        }
    }
}

export default Validation