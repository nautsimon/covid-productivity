import "./index.css";
import ReactDOM from "react-dom";
import React, { useEffect, useState, Fragment } from "react";
const endpoints = [
  "https://sheets.googleapis.com/v4/spreadsheets/1AseijmFSnz5LlNwtRpaJ5kwA6chKaT53OyZxN6jNe8k/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg",
  "https://sheets.googleapis.com/v4/spreadsheets/1AseijmFSnz5LlNwtRpaJ5kwA6chKaT53OyZxN6jNe8k/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg",
];
const tasks = ["sBook", "mag1", "lBook", "skSoc", "you1", "you2", "ex"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsA: [],
      itemsR: [],
      taskCompleteA: [],
      taskCompleteR: [],
      aylaTasks: {
        sBook: "❌",
        mag1: "❌",
        lBook: "❌",
        skSoc: "❌",
        you1: "❌",
        you2: "❌",
        ex: "❌",
      },
      roiTasks: {
        sBook: "❌",
        mag1: "❌",
        lBook: "❌",
        skSoc: "❌",
        you1: "❌",
        you2: "❌",
        ex: "❌",
      },
    };
  }
  //✅
  componentDidMount() {
    var tasksA = {
      sBook: "❌",
      mag1: "❌",
      lBook: "❌",
      skSoc: "❌",
      you1: "❌",
      you2: "❌",
      ex: "❌",
    };
    var tasksR = {
      sBook: "❌",
      mag1: "❌",
      lBook: "❌",
      skSoc: "❌",
      you1: "❌",
      you2: "❌",
      ex: "❌",
    };
    var today = new Date();
    var date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    for (let task = 0; task < 7; task++) {
      fetch(endpoints[task])
        .then((response) => response.json())
        .then((data) => {
          let batchRowValues = data.valueRanges[0].values;
          for (let i = 1; i < batchRowValues.length; i++) {
            console.log(batchRowValues[i][8].toString(), date);
            if (batchRowValues[i][2] === date) {
              if (batchRowValues[i][1] === "Ayla") {
                tasksA[tasks[task]] = "✅";
                // for (let x = 3; x < batchRowValues[i].length; x++) {
                //   rowsA.push(batchRowValues[i][x]);
                // }
              } else {
                tasksR[tasks[task]] = "✅";
                // for (let x = 3; x < batchRowValues[i].length; x++) {
                //   rowsR.push(batchRowValues[i][x]);
                // }
              }
            }
            // if (rowsR.length > 1 && rowsA.length > 1) {
            //   break;
            // }
          }
        });
    }

    this.setState({
      roiTasks: tasksR,
      aylaTasks: tasksA,
    });

    // console.log(
    //   this.state.itemsA,
    //   this.state.taskCompleteR,
    //   this.state.taskCompleteA,
    //   this.state.itemsR
    // );
  }
  render() {
    // const listItems = this.state.itemsR.map((number) => <li>{number}</li>);
    return (
      <div className="main">
        <h1>Daily Tasks</h1>
        <div className="row">
          <div className="bi left">
            <h2>🥶 Roi 🥶</h2>
            <p>
              {this.state.roiTasks.skSoc}
              <a href="https://forms.gle/S214gTczDcn1nYyS6"> Sport</a>
            </p>
            <p>
              {this.state.roiTasks.ex}
              <a href=""> Exercise</a>
            </p>
            <p>
              {this.state.roiTasks.lBook}
              <a href=""> Small Book</a>
            </p>
            <p>
              {this.state.roiTasks.sBook}
              <a href=""> Large Book</a>
            </p>
            <p>
              {this.state.roiTasks.mag1}
              <a href="https://forms.gle/ipkkjwYc41FBTDza8">
                {" "}
                Magazine/Article
              </a>
            </p>
            <p>
              {this.state.roiTasks.you1}
              <a href=""> YouTube Video #1</a>
            </p>
            <p>
              {this.state.roiTasks.you2}
              <a href=""> YouTube Video #2</a>
            </p>

            {/* <ul>
              {this.state.itemsR.map((ob) => {
                return <li>{ob}</li>;
              })}
            </ul> */}
          </div>
          <div className="bi right">
            <h2>🤪 Ayla 🤪</h2>
            <p>
              <a href="https://forms.gle/S214gTczDcn1nYyS6">Sport </a>{" "}
              {this.state.roiTasks.skSoc}{" "}
            </p>
            <p>
              <a href="">Exercise </a>
              {this.state.roiTasks.ex}
            </p>
            <p>
              <a href="">Small Book </a>
              {this.state.roiTasks.sBook}
            </p>
            <p>
              <a href="">Large Book </a>
              {this.state.roiTasks.lBook}
            </p>

            <p>
              <a href="https://forms.gle/ipkkjwYc41FBTDza8">
                Magazine/Article{" "}
              </a>
              {this.state.roiTasks.mag1}
            </p>
            <p>
              <a href="">YouTube Video #1 </a>
              {this.state.roiTasks.you1}
            </p>
            <p>
              <a href=""> YouTube Video #2 </a>
              {this.state.roiTasks.you2}
            </p>

            {/* <ul>
              {this.state.itemsA.map((ob) => {
                return <li>{ob}</li>;
              })}
            </ul> */}
          </div>
        </div>
        <h3>View responses</h3>
        <p className="center">
          <a href=""> [Sport] </a>
          <a href=""> [Exercise] </a>
          <a href=""> [Small Book] </a>
          <a href=""> [Large Book] </a>
          <a href=""> [Magazine/Article] </a>
          <a href=""> [YouTube #1] </a>
          <a href=""> [YouTube #2] </a>
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
