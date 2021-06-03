import {handleSubmit} from '../src/client/js/formHandler';

describe("Test submit", ()=>{
    test("Test handleSubmit()",()=>{
        expect(handleSubmit).toBeDefined();
    })
})