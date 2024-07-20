const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message){
      let response = {
         message: message.name,
         results: []
      };
      for (let i = 0; i < message.commands.length; ++i){
         if (message.commands[i].commandType === 'STATUS_CHECK'){
            response.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            })
               }
         if (message.commands[i].commandType === 'MODE_CHANGE'){
            this.mode = message.commands[i].value;
            response.results.push({
               completed: true
            })
         }
         if (message.commands[i].commandType === 'MOVE'){
            if (this.mode === 'LOW_POWER'){
               response.results.push({
                  completed: false
               })
            }
            else {
               this.position = message.commands[i].value;
               response.results.push({
                  completed: true
               })
            }
         }
            }
         return response;
         }
      
}

let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 85), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE', 32), new Command('STATUS_CHECK')];
let message = new Message('Test message', commands);
let rover = new Rover(1);
let response = rover.receiveMessage(message);
console.log(response.results);





module.exports = Rover;