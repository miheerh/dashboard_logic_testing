import { createMachine, interpret } from 'xstate';
// Define the state machine configuration
const dashboard = createMachine({
  id: 'toggle',
  initial: 'off',
  states: {
    off: {
      on: { TOGGLE: 'on' }
    },
    on: {
      on: { TOGGLE: 'off' }
    }
  }
});
// Create a service for the state machine
const dashboardService = interpret(dashboard);
// Start the service
dashboardService.start();


