const myStyle = {
  fontFamily: "sans-serif",
  padding: "4rem",
  color: "rgba(73, 63, 252, 100%)",
  fontSize: "4rem",
  textAlign: "center",
};
const Home = (props) => {
  return (
    <div>
      {!props.user && <h1 style={myStyle}>Welcome to fitnesstrac.kr</h1>}
      {props.user && <h1 style={myStyle}>Welcome, {props.user.username}</h1>}
    </div>
  );
};

export default Home;
