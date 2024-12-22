import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/statistiky");
  }, [navigate]);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
}
