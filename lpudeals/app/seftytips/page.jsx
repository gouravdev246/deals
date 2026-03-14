'use client'
const SafetyTips = () => {
  const tips = [
    {
      title: "Meet in Public Places",
      desc: "Always meet the buyer or seller in a public location on campus such as the library, cafeteria, or academic block."
    },
    {
      title: "Verify Student Identity",
      desc: "Make sure the person you are dealing with is an LPU student. Ask for their university ID if necessary."
    },
    {
      title: "Check the Product Carefully",
      desc: "Before making any payment, inspect the product to ensure it matches the description and is in working condition."
    },
    {
      title: "Avoid Advance Payments",
      desc: "Do not send money before meeting the seller and checking the item in person."
    },
    {
      title: "Communicate Through Platform",
      desc: "Use the platform messaging system to keep conversations transparent and secure."
    },
    {
      title: "Report Suspicious Activity",
      desc: "If you find any suspicious listings or users, report them immediately through the platform."
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Safety Tips</h1>
      <p style={styles.subtext}>
        Follow these guidelines to ensure a safe buying and selling experience
        within the LPU campus marketplace.
      </p>

      <div style={styles.grid}>
        {tips.map((tip, index) => (
          <div key={index} style={styles.card}>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Arial"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  subtext: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#555"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }
};

export default SafetyTips;