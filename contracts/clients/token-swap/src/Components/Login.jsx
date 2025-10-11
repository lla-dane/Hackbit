import React from "react";

const Login = (props) => {
  // Inline CSS for the component
  const styles = {
    container: {
      backgroundColor: "#333", // Dark background color
      color: "#fff", // White text color for contrast
      padding: "20px", // Padding around the container
      borderRadius: "8px", // Rounded corners
      display: "flex", // Using flexbox for layout
      flexDirection: "column", // Stack children vertically
      alignItems: "center", // Center-align items horizontally
      justifyContent: "center", // Center-align items vertically
      height: "100vh", // Full viewport height
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', // Font family for text
    },
    button: {
      backgroundColor: "#007bff", // Bootstrap primary button color
      color: "#fff", // Text color for the button
      border: "none", // No border for the button
      padding: "10px 20px", // Padding inside the button
      borderRadius: "5px", // Rounded corners for the button
      cursor: "pointer", // Cursor pointer to indicate it's clickable
      fontSize: "16px", // Font size for the button text
      marginTop: "20px", // Margin top for spacing above the button
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // Box shadow for 3D effect
      transition: "background-color 0.3s", // Smooth transition for hover effect
    },
  };

  return (
    <div style={styles.container}>
      <h2>WELCOME TO TOKEN SWAPPER</h2>
      <button style={styles.button} onClick={props.connectWallet}>
        Login Metamask
      </button>
    </div>
  );
};

export default Login;
