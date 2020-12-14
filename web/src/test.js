import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SceneThree from "./components/SceneThree";
import downArrow from "./downArrow.png";
import buy from "./icons/buy.png";
import sell from "./icons/sell.png";
import rent from "./icons/rent.png";
import track from "./icons/track.png";
import services from "./icons/services.png";
import network from "./icons/network.png";
import { Link, Element } from "react-scroll";
import email from "./email.png";
import link from "./link.png";
//import poolLogo from "./pool.png";

import "./index.css";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -87.6241,
      lat: 41.8898,
      zoom: 15.5,
      subVal: 0,
      graphics: { color: "0x40b3ff", speed: 2, noise: 1 },
      subme: false,
      email: "",
      sub: "Server Request not Made",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShit = this.handleShit.bind(this);
  }

  // componentDidMount() {
  //   function rotateCamera(timestamp) {
  //     // clamp the rotation between 0 -360 degrees
  //     // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  //     map.rotateTo((timestamp / 900) % 360, { duration: 0 });
  //     // Request the next frame of the animation.
  //     requestAnimationFrame(rotateCamera);
  //   }

  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: "mapbox://styles/simononon/ckc56hwrr00i51ir2vrgm5376",
  //     center: [this.state.lng, this.state.lat],
  //     zoom: this.state.zoom,
  //     pitch: 90,
  //   });

  //   map.on("move", () => {
  //     this.setState({
  //       lng: map.getCenter().lng.toFixed(4),
  //       lat: map.getCenter().lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2),
  //     });
  //   });

  //   map.on("load", () => {
  //     // Start the animation.
  //     rotateCamera(0);

  //     // Add 3d buildings and remove label layers to enhance the map
  //     var layers = map.getStyle().layers;
  //     for (var i = 0; i < layers.length; i++) {
  //       if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
  //         // remove text labels
  //         map.removeLayer(layers[i].id);
  //       }
  //     }
  //     map.addLayer({
  //       id: "3d-buildings",
  //       source: "composite",
  //       "source-layer": "building",
  //       filter: ["==", "extrude", "true"],
  //       type: "fill-extrusion",
  //       minzoom: 15,
  //       paint: {
  //         "fill-extrusion-color": "#59b9fa",

  //         // use an 'interpolate' expression to add a smooth transition effect to the
  //         // buildings as the user zooms in
  //         "fill-extrusion-height": [
  //           "interpolate",
  //           ["linear"],
  //           ["zoom"],
  //           15,
  //           0,
  //           15.05,
  //           ["get", "height"],
  //         ],
  //         "fill-extrusion-base": [
  //           "interpolate",
  //           ["linear"],
  //           ["zoom"],
  //           15,
  //           0,
  //           15.05,
  //           ["get", "min_height"],
  //         ],
  //         "fill-extrusion-opacity": 0.2,
  //       },
  //     });
  //   });
  // }
  async handleSubmit(e) {
    e.preventDefault();
    var msg = this.state.email;
    var curTime = new Date();
    var subMsg;
    var valid;
    console.log("sending");
    await axios
      .post("https://simonmahn.pythonanywhere.com/postEmail/", {
        email: msg,
        time: curTime,
      })
      .then((response) => {
        console.log("send");
        if (response) {
          valid = true;
          console.log("Returned data:", response);
          if (response.data.message === "clone") {
            subMsg = "We already have your email in our database :)";
          } else if (response.data.message === "good") {
            subMsg =
              "Response Recorded: We thank you for your contribution to the platform.";
          } else {
            subMsg = "Invalid Email: Check your email and submit again";
          }
        }
      })
      .catch(() => {
        subMsg = "Server Failure: Try again.";
        valid = false;
      })
      .finally(() => {
        this.handleShit(valid, subMsg);
      });
  }

  // base("Table 1")
  //   .create([
  //     {
  //       fields: { Email: msg, Time: curTime },
  //     },
  //   ])
  //   .then(() => {
  //     this.handleShit(
  //       "Response Recorded: We thank you for your contribution to the platform."
  //     );
  //   })
  //   .catch((err) => {
  //     this.handleShit("Server Error");
  //     console.log("error");
  //   });

  handleShit(valid, subMsg) {
    let updatesub = (valid, subMsg) => {
      console.log(subMsg, valid);
      return new Promise((resolve, reject) => {
        this.setState({ sub: subMsg, subme: valid, subVal: 1 });
        resolve("success");
      });
    };

    // let updateGraphics = (response) => {
    //   return new Promise((resolve, reject) => {
    //     if (response.valid !== false) {
    //       console.log("starting");
    //       this.setState({ subme: true });
    //       resolve("success");
    //     }
    //   });
    // };

    updatesub(valid, subMsg).then(() => {
      return console.log("Recording cycle complete.");
    });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    return (
      <div className="black">
        <div className="landingDiv">
          <SceneThree subme={this.state.subme} />
          <div className="titleDiv">
            <h1 className="titleText">WELCOME TO THE POOL</h1>
            <span className="subTitleText">
              A next generation marketplace. Rooted in your community, built for
              flexibility.
            </span>
            <div className="formDiv">
              <h3 className="">Sign up to join the Beta release.</h3>

              <form onSubmit={this.handleSubmit} noValidate>
                <input
                  type="email"
                  name="txtEmail"
                  placeholder="email"
                  className="email"
                  onChange={this.onEmailChange.bind(this)}
                  value={this.state.email}
                  required
                />
                <button className="butt" type="submit">
                  submit
                </button>
              </form>
              <p style={{ opacity: this.state.subVal }} className="inputSub">
                {this.state.sub}
              </p>
            </div>
          </div>

          <Link
            to="intro"
            style={{ width: "100%", zIndex: "20" }}
            offset={2}
            smooth={true}
            duration={800}
            className="arrowDiv"
          >
            <img src={downArrow} className="arrImg" alt="downArr" />
          </Link>
        </div>
        <Element name="intro">
          <div className="restDiv">
            {/* <div
              ref={(el) => (this.mapContainer = el)}
              className="mapContainer"
            >
              <div className="desDiv">
                <div className="desDivIn">
                  <h1 className="inTex">
                    A next generation marketplace. Rooted in your community,
                    built for flexibility.
                  </h1>
                </div>
              </div>
            </div> */}
            <div className="features">
              <h3 className="featTex">Features</h3>
              <div className="triRow">
                <div className="col">
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        Buy things from those in your community for cheap and
                        efficently.
                      </p>
                    </div>
                    <img src={buy} alt="buy" className="cardImg" />
                    <h1 className="cardTex">Buy</h1>
                  </div>
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        An intuitive feature that enables users to "cast a line"
                        into their pool to be notified when desired objects are
                        on the market. This not only shares supply information
                        with the user, but also informs levels of demand to
                        sellers.
                      </p>
                    </div>
                    <img src={track} alt="track" className="cardImg" />
                    <h1 className="cardTex">Track</h1>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        Sell your things intelligently, use analytics tools to
                        see demand in your pool, port your sale to other
                        buy/sell services, and more.
                      </p>
                    </div>
                    <img src={sell} alt="sell" className="cardImg" />
                    <h1 className="cardTex">Sell</h1>
                  </div>
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        Advertise your services to others or pick up a gig in
                        your community.
                      </p>
                    </div>
                    <img src={services} alt="services" className="cardImg" />
                    <h1 className="cardTex">Gigs and Services</h1>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        Rent and lend items frictionlessly. Whether it be your
                        old textbooks, electronics, or your car.
                      </p>
                    </div>
                    <img src={rent} alt="rent" className="cardImg" />
                    <h1 className="cardTex">Rent</h1>
                  </div>
                  <div className="card">
                    <div className="outBehind">
                      <p className="behindTex">
                        Connect with others in your community with location
                        based message boards and groupchats.
                      </p>
                    </div>
                    <img src={network} alt="network" className="cardImg" />
                    <h1 className="cardTex">Create connections</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Element>
        <footer>
          <a href="https://www.linkedin.com/company/thepoolapp/">
            <img className="footIco" alt="link" src={link}></img>
          </a>
          <a href="mailto:thepoolapp@gmail.com">
            <img className="footIco" alt="email" src={email}></img>
          </a>
          {/* <img className="footPIco" alt="pool" src={poolLogo}></img> */}
          <h3 className="footTex">Pool © 2020</h3>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("app"));

// render() {
//   return (
//     <div>
//       <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
//       <div className="titleDiv">
//         <h1 className="titleText">POOL</h1>

//         <div className="row">
//           <SceneThree />
//         </div>
//       </div>
//     </div>
//   );
// }
// }
