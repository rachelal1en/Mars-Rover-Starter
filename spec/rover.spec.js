const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testObj = new Rover(3);
    let meetsExpectations = false;
    if (testObj.position === 3){
      if (testObj.mode === 'NORMAL'){
        if (testObj.generatorWatts === 110){
          meetsExpectations = true;
        }
      }
    }
    expect(meetsExpectations).toEqual(true);
  });
  //Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = new Command('Blank');
    let message = new Message('Test message with no commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);    
    expect(response.message).toEqual('Test message with no commands');
  });
  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message); 
    let count = 0;
    for (let i = 0; i < response.results.length; ++i){
        count += 1;
    }
    expect(count).toEqual(2);
  });
  //Test 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let meetsExpectations = false;
    if (response.results[0].roverStatus.position === rover.position){
      if (response.results[0].roverStatus.mode === rover.mode){
        if (response.results[0].roverStatus.generatorWatts === rover.generatorWatts){
          meetsExpectations = true;
        }
      }
    }
    expect(meetsExpectations).toEqual(true);
  });
  //Test 11
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(message.commands[0].value).toEqual(response.results[1].roverStatus.mode);
  });
  //Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 32), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let rover = new Rover(1);
    let response = rover.receiveMessage(message);
    expect(response.results[2].roverStatus.position).toEqual(1);
  });
  //Test 13
  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 32), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let rover = new Rover(1);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toEqual(32);
  });
});
