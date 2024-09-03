import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Head>
        <title>Frontend App</title>
        <meta
          name="description"
          content="Welcome to our frontend application"
        />
      </Head>
      <main>
        <h1 style={{ color: "#333", fontSize: "2.5rem" }}>
          Welcome to the Frontend
        </h1>
      </main>
    </div>
  );
};

export default Home;
