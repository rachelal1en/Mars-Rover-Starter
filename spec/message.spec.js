const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    //Test 4
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Message name required.'));
      });
    //Test 5
    it("constructor sets name", function() {
        let testObj = new Message("Rachel");
        expect(testObj.name).toBe("Rachel");
      });
    //Test 6
    it("constructor sets a value passed in as the 2nd argument", function() {
        let testObj = new Message("Rachel", "Say Hi");
        expect(testObj.commands).toBe("Say Hi");
      });
});
