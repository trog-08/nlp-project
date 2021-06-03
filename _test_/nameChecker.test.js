import {checkForName} from '../src/client/js/nameChecker'

describe("Test input url",()=>{
    test("Test checkForName()", ()=>{
       expect(checkForName("Working")).toBe(false);
        })})