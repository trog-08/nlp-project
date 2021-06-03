import {checkForName} from '../src/client/js/nameChecker'

describe("Testing to make sure input is url",()=>{
    test("Testing the checkForName() function", ()=>{
       expect(checkForName("hello")).toBe(false);
        })})