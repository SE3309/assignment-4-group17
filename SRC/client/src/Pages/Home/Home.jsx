import Container from "../Container";
import "../Page.css";
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api").then((res) => {
      if (res.status !== 200) {
        return console.error(res);
      }
      setMessage(res.data);
    });
  }, []);

  return (
    <div className="home page">
      <Container>
        <h1>Home</h1>
        <h2>
          Server Message: <span>{message}</span>
        </h2>
      </Container>
    </div>
  );
}

export default Home;
