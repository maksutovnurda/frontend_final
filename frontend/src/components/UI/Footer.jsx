import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>Yela.shop</h3>
          <p>Fresh, quality food delivered to your door.</p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Shop Categories</h4>
          <ul style={styles.list}>
            <li>Fresh Produce</li>
            <li>Snacks & Treats</li>
            <li>Beverages</li>
            <li>Dairy & Eggs</li>
            <li>Organic & Gluten-Free</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Customer Support</h4>
          <ul style={styles.list}>
            <li>FAQ</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Refunds</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <ul style={styles.list}>
            <li>
              <a href="/" style={styles.link}>
                Instagram
              </a>
            </li>
            <li>
              <a href="/" style={styles.link}>
                Facebook
              </a>
            </li>
            <li>
              <a href="/" style={styles.link}>
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>
          © 2024 <strong>Yela.shop</strong>. All rights reserved.
        </p>
        <p>
          <a href="/" style={styles.link}>
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/" style={styles.link}>
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#038aff",
    color: "#ffff",
    padding: "20px 0",
    fontSize: "14px",
    borderTop: "1px solid #eaeaea",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  section: {
    flex: "1",
    minWidth: "200px",
    margin: "10px",
  },
  heading: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
  bottom: {
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Footer;
