class Logger {
    static log (str) {
        if (str.toString) {       
            console.log(str.toString())
        }
    }
    static error (str) {
        if (str.toString) {       
            console.error(str.toString())
        }
    }
}

module.exports = Logger