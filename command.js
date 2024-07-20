class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
      if (!commandType) {
        throw Error("Command type required.");
      }
     this.value = value;
   }
 
 }
 
// let MOVE = new Command(position, 'LOW_POWER');
// let moveCommand = new Command('MOVE', 12000);
// console.log(modeCommand, moveCommand);

 module.exports = Command;