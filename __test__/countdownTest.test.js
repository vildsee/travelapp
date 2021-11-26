import { countdownTest } from "../src/client/js/tests.js";
// function countdownTest () {
    
//     const day = new Date().getTime()
//     const startDate = new Date(document.getElementById('start').value)

//     count = startDate - day
//     var days = Math.floor(count / (1000 * 60 * 60 * 24));
    
//     return days
// };


describe('test date coundown', () => {
    test('testing', () => {
        expect(countdownTest).toBeDefined();
    })
})
