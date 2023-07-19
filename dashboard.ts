import { createMachine, interpret } from 'xstate';
// Define the state machine configuration
const dashboard = createMachine({
  
  initial: 'idle',
  states: {
    idle:{
      entry:['filterMcStart','cardMcStart'],
      on:{
        profile:'profile',
        reco:'reco',
        logout:'logout'
      }
    },
    profile: {
    entry:'filterMcStart'
        
    },
    reco: {
        entry:'filterMcStart'
    },
    logout: { 
      on:{
        error:'idle',
        done:'logoutcomplete'
      }
      },
    logoutcomplete: {  
        entry:'filterMcStart'
      }
      }
    },
   {
    actions: {
      filterMcStart:()=>{
          console.log("filterstart")
      },
      cardMcStart:()=>{
        console.log("cardstart")
      }
      }
    }
);

 // Create a service for the state machine
  const dashboardService = interpret(dashboard)
// Start the service
dashboardService.start();
