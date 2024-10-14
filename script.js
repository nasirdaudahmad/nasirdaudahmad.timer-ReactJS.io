// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 


const BreakInfo = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "Info" }, /*#__PURE__*/
    React.createElement("label", { id: "break-label" },
    props.label), /*#__PURE__*/

    React.createElement("button", {
      id: "break-increment",
      onClick: props.handleBreakInc }, "+"), /*#__PURE__*/



    React.createElement("span", { id: "break-length" },
    props.value), /*#__PURE__*/


    React.createElement("button", { id: "break-decrement", onClick: props.handleBreakDec }, "-")));


};

const SessionInfo = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "Info" }, /*#__PURE__*/

    React.createElement("label", { id: "session-label" },
    props.label), /*#__PURE__*/

    React.createElement("button", { id: "session-increment", onClick: props.handleSessionInc }, "+"), /*#__PURE__*/
    React.createElement("span", { id: "session-length" },
    props.value), /*#__PURE__*/


    React.createElement("button", { id: "session-decrement", onClick: props.handleSessionDec }, "-")));


};
const Timer = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("label", { id: "timer-label" }, props.label), /*#__PURE__*/
    React.createElement("h3", { id: "time-left" }, props.timeleft), /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: props.handleStartStop }, props.startstop), /*#__PURE__*/
    React.createElement("button", { id: "reset", onClick: props.handleReset }, "Reset"), /*#__PURE__*/
    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      ref: audio => {
        this.audioBeep = audio;
      },
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      reset: false,
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 1500,
      breakTimeLeft: 300,
      breakStarted: false,
      reset: false };

    this.handleBreakInc = this.handleBreakInc.bind(this);
    this.handleBreakDec = this.handleBreakDec.bind(this);
    this.handleSessionInc = this.handleSessionInc.bind(this);
    this.handleSessionDec = this.handleSessionDec.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
  }
  handleBreakInc() {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength < 60 ? prevState.breakLength + 1 : prevState.breakLength,
        breakTimeLeft: prevState.breakLength === 60 ? prevState.breakLength * 60 : (prevState.breakLength + 1) * 60 };

    });
  }
  handleBreakDec() {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength > 1 ? prevState.breakLength - 1 : prevState.breakLength,
        breakTimeLeft: prevState.breakLength === 1 ? prevState.breakLength * 60 : (prevState.breakLength - 1) * 60 };

    });
  }
  handleSessionInc() {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength < 60 ? prevState.sessionLength + 1 : prevState.sessionLength,
        timeLeft: prevState.sessionLength === 60 ? prevState.sessionLength * 60 : (prevState.sessionLength + 1) * 60 };

    });
  }
  handleSessionDec() {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength > 1 ? prevState.sessionLength - 1 : prevState.sessionLength,
        timeLeft: prevState.sessionLength === 1 ? prevState.sessionLength * 60 : (prevState.sessionLength - 1) * 60 };

    });
  }
  handleReset() {
    this.setState(() => {
      return {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 1500,
        breakStarted: false,
        paused: true,
        reset: true };

    });

  }
  handleStartStop() {
    this.setState(prevState => {
      return {
        paused: !prevState.paused,
        reset: false };

    });
  }
  componentDidMount() {
    const timer = setInterval(() => {this.setState(prevState => {
        if (!this.state.breakStarted)
        return {
          timeLeft: !this.state.paused && prevState.timeLeft !== 0 ? prevState.timeLeft - 1 : prevState.timeLeft,
          breakStarted: this.state.timeLeft === 0 ? true : false,
          breakTimeLeft: this.state.breakLength * 60 };else

        if (this.state.breakStarted)
        return {
          breakTimeLeft: !this.state.paused && prevState.breakTimeLeft !== 0 ? prevState.breakTimeLeft - 1 : prevState.breakTimeLeft,
          breakStarted: this.state.breakTimeLeft === 0 ? false : true,
          timeLeft: this.state.sessionLength * 60 };


      });}, 1000);
  }
  render() {
    const timerTimeLeft =
    !this.state.breakStarted ?
    String(Math.floor(this.state.timeLeft / 60)).padStart(2, '0') + ":" + String(this.state.timeLeft % 60).padStart(2, '0') :
    String(Math.floor(this.state.breakTimeLeft / 60)).padStart(2, '0') + ":" + String(this.state.breakTimeLeft % 60).padStart(2, '0');

    const x = document.getElementById('beep');
    if (this.state.timeLeft === 0 && !this.state.reset) {
      x.play();
    } else if (this.state.reset) {
      x.pause();
      x.load();
    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "clockcontainer" }, /*#__PURE__*/
      React.createElement(BreakInfo, { label: "Break Length: ", value: this.state.breakLength, handleBreakInc: this.handleBreakInc, handleBreakDec: this.handleBreakDec }), /*#__PURE__*/
      React.createElement(SessionInfo, { label: "Session Length: ", value: this.state.sessionLength, handleSessionInc: this.handleSessionInc, handleSessionDec: this.handleSessionDec }), /*#__PURE__*/

      React.createElement(Timer, { label: this.state.breakStarted ? "Break" : "Session",
        startstop: this.state.paused ? "Start" : "Pause",
        timeleft: timerTimeLeft,
        handleReset: this.handleReset, handleStartStop: this.handleStartStop })));


  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));