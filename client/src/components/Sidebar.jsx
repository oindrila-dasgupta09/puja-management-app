import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        background: "#222",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <p
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Dashboard
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate("/pujas")
        }
      >
        Pujas
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate("/purohits")
        }
      >
        Purohits
      </p>

      <p
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate("/users")
        }
      >
        Users
      </p>
    </div>
  );
}

export default Sidebar;
