import Link from "next/link";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      paddingTop: "5%",
      height: "50vh",
      textAlign: "center"
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn’t exist or has been moved.</p>
      
      {/* Go to Home Button */}
      <Link href="/" passHref>
        <button style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "green",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.3s"
        }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
}
