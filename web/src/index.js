import "./index.css";
import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";

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
        sBook: "⌛",
        mag1: "⌛",
        lBook: "⌛",
        skSoc: "⌛",
        you1: "⌛",
        you2: "⌛",
        ex: "⌛",
      },
      roiTasks: {
        sBook: "⌛",
        mag1: "⌛",
        lBook: "⌛",
        skSoc: "⌛",
        you1: "⌛",
        you2: "⌛",
        ex: "⌛",
      },
    };
  }
  //✅
  componentDidMount() {
    // var tasksA = ["⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️"];
    // var tasksR = ["⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️"];
    var tasksA = {
      sBook: "⚠️",
      mag1: "⚠️",
      lBook: "⚠️",
      skSoc: "⚠️",
      you1: "⚠️",
      you2: "⚠️",
      ex: "⚠️",
    };
    var tasksR = {
      sBook: "⚠️",
      mag1: "⚠️",
      lBook: "⚠️",
      skSoc: "⚠️",
      you1: "⚠️",
      you2: "⚠️",
      ex: "⚠️",
    };
    var today = new Date();
    var date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

    axios
      .all([
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1yckjyG69_OdX8QNEgu6I-jgFqRoFPCnM4yoe4TPe9Dw/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1AseijmFSnz5LlNwtRpaJ5kwA6chKaT53OyZxN6jNe8k/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1rNxzheWKEXzo4zV7K8bqqYu5yvYIvyi1JhQg4habvKo/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1XJu6HB0cgaq2dwVsFFaObF_-_Azpg2CeMrSJ96LG_Rk/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1KvCtqgAwUb5p33q-XTwRjQixrZfSiWzySo13ytJ6OyA/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1ja_fyIb5ru7c1bCWGG5Oo7e53aEO_Upzh-MbUSiEHNI/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
        axios.get(
          "https://sheets.googleapis.com/v4/spreadsheets/1UAGz8wRBfpTFR8GDfWoFCb__ONhKelM_a2l8mPo6b4M/values:batchGet?ranges=Sheet1!A1:I5&majorDimension=ROWS&key=AIzaSyB4ccVNZXw8KZFWzAmju_6ZDQ_kTFOhMcg"
        ),
      ])
      .then((responseArr) => {
        //this will be executed only when all requests are complete
        for (let task = 0; task < 7; task++) {
          var stuff = responseArr[task].data.valueRanges[0].values;
          console.log(stuff);
          for (let i = 1; i < stuff.length; i++) {
            //console.log(stuff[i][2], stuff[i][1]);
            if (stuff[i][2] === "Ayla") {
              if (stuff[i][1] === date) {
                tasksA[tasks[task]] = "✅";
              }
            } else {
              if (stuff[i][1] === date) {
                tasksR[tasks[task]] = "✅";
              }
            }
          }
        }
        console.log(today.getDate(), today.getDate() % 2);
        if (today.getDate() % 2 === 0) {
          console.log(today.getDate());
          tasksR.mag1 = "✅";
          tasksA.mag1 = "✅";
        } else {
          tasksR.sBook = "✅";
          tasksA.sBook = "✅";
        }
        var output = { tasksR: tasksR, tasksA: tasksA };

        return output;
      })
      .then((output) => {
        console.log(output);
        return this.setState({
          roiTasks: output.tasksR,
          aylaTasks: output.tasksA,
        });
      });
  }
  render() {
    // const listItems = this.state.itemsR.map((number) => <li>{number}</li>);
    return (
      <div className="main">
        <div className="mainIn">
          <h1>Daily Tasks</h1>
          <div className="row">
            <div className="bi left">
              <h2>🥶 Roi 🥶</h2>
              <p>
                {this.state.roiTasks.skSoc}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/S214gTczDcn1nYyS6"
                >
                  Sport
                </a>
              </p>
              <p>
                {this.state.roiTasks.ex}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/xM33ELo2p2zotY9e6"
                >
                  Exercise
                </a>
              </p>
              <p>
                {this.state.roiTasks.sBook}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/muVzbtNgFfooD3nVA"
                >
                  Small Book
                </a>
              </p>
              <p>
                {this.state.roiTasks.lBook}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/WSo3Anc3jgcmpVNx8"
                >
                  Large Book
                </a>
              </p>
              <p>
                {this.state.roiTasks.mag1}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/ipkkjwYc41FBTDza8"
                >
                  Magazine/Article
                </a>
              </p>
              <p>
                {this.state.roiTasks.you1}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/ptnMH28cyrvtUmw16"
                >
                  YouTube Video #1
                </a>
              </p>
              <p>
                {this.state.roiTasks.you2}{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/UNEVSmxNu3Prf5rG6"
                >
                  YouTube Video #2
                </a>
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/S214gTczDcn1nYyS6"
                >
                  Sport
                </a>{" "}
                {this.state.aylaTasks.skSoc}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/xM33ELo2p2zotY9e6"
                >
                  Exercise
                </a>{" "}
                {this.state.aylaTasks.ex}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/muVzbtNgFfooD3nVA"
                >
                  Small Book
                </a>{" "}
                {this.state.aylaTasks.sBook}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/WSo3Anc3jgcmpVNx8"
                >
                  Large Book
                </a>{" "}
                {this.state.aylaTasks.lBook}
              </p>

              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/ipkkjwYc41FBTDza8"
                >
                  Magazine/Article
                </a>{" "}
                {this.state.aylaTasks.mag1}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/ptnMH28cyrvtUmw16"
                >
                  YouTube Video #1
                </a>{" "}
                {this.state.aylaTasks.you1}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.gle/UNEVSmxNu3Prf5rG6"
                >
                  YouTube Video #2
                </a>{" "}
                {this.state.aylaTasks.you2}
              </p>

              {/* <ul>
              {this.state.itemsA.map((ob) => {
                return <li>{ob}</li>;
              })}
            </ul> */}
            </div>
          </div>
        </div>
        <h3>View previous responses</h3>
        <p className="center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1XJu6HB0cgaq2dwVsFFaObF_-_Azpg2CeMrSJ96LG_Rk/edit?usp=sharing"
          >
            {" "}
            [Sport]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1UAGz8wRBfpTFR8GDfWoFCb__ONhKelM_a2l8mPo6b4M/edit?usp=sharing"
          >
            {" "}
            [Exercise]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1yckjyG69_OdX8QNEgu6I-jgFqRoFPCnM4yoe4TPe9Dw/edit?usp=sharing"
          >
            {" "}
            [Small Book]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1rNxzheWKEXzo4zV7K8bqqYu5yvYIvyi1JhQg4habvKo/edit?usp=sharing"
          >
            {" "}
            [Large Book]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1AseijmFSnz5LlNwtRpaJ5kwA6chKaT53OyZxN6jNe8k/edit?usp=sharing"
          >
            {" "}
            [Magazine/Article]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1KvCtqgAwUb5p33q-XTwRjQixrZfSiWzySo13ytJ6OyA/edit?usp=sharing"
          >
            {" "}
            [YouTube #1]{" "}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1ja_fyIb5ru7c1bCWGG5Oo7e53aEO_Upzh-MbUSiEHNI/edit?usp=sharing"
          >
            {" "}
            [YouTube #2]{" "}
          </a>
        </p>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
