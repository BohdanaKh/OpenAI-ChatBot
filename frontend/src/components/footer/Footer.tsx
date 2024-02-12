import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/*                <p style={{ fontSize: "18px", textAlign: "center", padding: "20px 20px 0 ", color: "darkgray", letterSpacing: "4px", margin: "20px 0 0", opacity: "50%" }}>*/}

        <img
          src={"Ukraine.png"}
          alt="Ukraine"
          width={"100px"}
          height={"50px"}
          style={{ margin: "0 auto" }}
        />
        <span style={{ textAlign: "center", padding: "0 20px", margin: 0 }}>
          <Link
            className="navlink"
            to={"https://linkedin.com/in/bohdana-khymynets"}
          >
            Contacts
          </Link>
        </span>

        {/* </p> */}
      </div>
    </footer>
  );
};

export { Footer };
