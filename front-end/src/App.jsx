import { useState } from "react";
import firebase from "firebase/compat/app";

import "./App.css";
import { db } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [postContent, setPostContent] = useState("");

  const addUser = () => {
    db.collection("UserTestProgram")
      .add({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setEmail("");
      });
  };
  return (
    <main>
      <h1>Firebase Email Notification</h1>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User Email"
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div>
        <input
          type="text"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Post Content"
        />
        {/* <button onClick={addPost}>Add Post</button> */}
      </div>
    </main>
  );
}

export default App;
