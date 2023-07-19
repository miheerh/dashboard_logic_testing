import { createMachine, assign } from 'xstate';
// Define the traffic light machine
const trafficLightMachine = createMachine(
  {
    initial: 'green',
    context: {
      timer: 0,
    },
    states: {
      green: {
        entry: 'resetTimer',
        on: {
          TIMER: [
            {
              target: 'yellow',
              cond: 'shouldChangeToYellow',
              actions: 'incrementTimer',
            },
            {
              target: 'green',
              actions: 'incrementTimer',
            },
          ],
        },
      },
      yellow: {
        entry: 'resetTimer',
        on: {
          TIMER: [
            {
              target: 'red',
              cond: 'shouldChangeToRed',
              actions: 'incrementTimer',
            },
            {
              target: 'yellow',
              actions: 'incrementTimer',
            },
          ],
        },
      },
      red: {
        entry: 'resetTimer',
        on: {
          TIMER: [
            {
              target: 'green',
              cond: 'shouldChangeToGreen',
              actions: 'incrementTimer',
            },
            {
              target: 'red',
              actions: 'incrementTimer',
            },
          ],
        },
      },
    },
  },
  {
    guards: {
      shouldChangeToYellow: (context) => context.timer >= 5,
      shouldChangeToRed: (context) => context.timer >= 3,
      shouldChangeToGreen: (context) => context.timer >= 2,
    },
    actions: {
      resetTimer: assign({
        timer: 0,
      }),
      incrementTimer: assign({
        timer: (context) => context.timer + 1,
      }),
    },
  }
);
// Create an instance of the traffic light machine
const trafficLight = trafficLightMachine.withContext({
  timer: 0,
});
// Start the traffic light machine
let currentState = trafficLight.initialState;
// Simulate the traffic light behavior
setInterval(() => {
  currentState = trafficLight.transition(currentState, 'TIMER');
  console.log('Current state:', currentState.value);
}, 1000);
