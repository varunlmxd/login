import React, { Component } from "react";
import ReactDOM from 'react-dom';
import FileIcon, { defaultStyles } from "react-file-icon";
import { Retrieve } from "./components/StoreContent";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "reactstrap";
import "./App.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase,ref,set,get,child,push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDKfcDho-V6z4TO9qTZZ8XfN5jk4zAiqvI",
  authDomain: "dengey-77444.firebaseapp.com",
  projectId: "dengey-77444",
  storageBucket: "dengey-77444.appspot.com",
  messagingSenderId: "920336204167",
  appId: "1:920336204167:web:7538703652910832969322"
}
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
/* create the client */

class App extends Component {
  user = sessionStorage.getItem('universalVariable');
  
  state = {
    isReady: true, // State to track whether rendering is complete
  };
  componentDidMount() {
    this.onDrop(); // Call a function to fetch data and render additional elements
  }

  getFiles = async (cid) => {
    const files = await Retrieve(cid);
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.type}`);
      const type = (file.name).substr(file.name.lastIndexOf(".") + 1);

      const parentElement = document.getElementById("add");
      console.log(parentElement)
      // Sample data for the item
      const item = [file.cid, file.name, type];

      // Create the first <th> element with FileIcon
      const row = document.createElement("tr");
      const fileIconTh = document.createElement("th");


      console.log("here");
      ReactDOM.render(<FileIcon
        size={30}
        extension={type}
        {...defaultStyles[type]}/>, fileIconTh);
      console.log("here1");
      // Create the second <th> element with the anchor link
      const textTh = document.createElement("th");
      textTh.classList.add("text-left");
      const link = document.createElement("a");
      link.href = "https://ipfs.io/ipfs/" + item[0];
      link.textContent = item[1];
      console.log("here2");
      textTh.appendChild(link);

      // Add both <th> elements to the parent element
      console.log("here");
      row.appendChild(fileIconTh);
      console.log("here");
      row.appendChild(textTh);
      parentElement.appendChild(row);
      console.log(type)
    }
    this.setState({ isReady: true });
  };

  onDrop = async () => {
    try {
      console.log(this.user)
      get(child(ref(db), "user/" + this.user+"/link"))
          .then((snapshot) => {
              const user = Object.values(snapshot.val());
              console.log(user)
              for (const child of user) {
                this.getFiles(Object.values(child).toString());
              }
          })
          .catch((err)=>{
            console.log(err)
          });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isReady } = this.state;

    return (
      <div className="App" t={this.onDrop}>
        <div className="container pt-3">
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
              </tr>
            </thead>
            <tbody id="add" >
            
            </tbody>
          </Table>
        </div >
      </div >
    );
  }
}

export default App;
