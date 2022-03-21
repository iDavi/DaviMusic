module.exports = {
    toBe: (test, toBe) => {
        if(test != toBe){
            console.log("\x1b[31m%s\x1b[0m", "FAILED: " + test + " is not equal to " + toBe);
        }
    },
    notBe: (test, notBe) => {
        if(test == notBe){
            console.log(`\x1b[31m%s\x1b[0m`, "FAILED: " + test + " is equal to " + notBe);
        }
    },
    checkPoint: (name) => {
        console.log("CHECKPOINT: reached on checkpoint: " + name)
    }	
}