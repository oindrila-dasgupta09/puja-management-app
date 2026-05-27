import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#ff6b00",
        color: "white",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        padding: "0 30px",
      }}
    >
      <h2>Puja Management</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
