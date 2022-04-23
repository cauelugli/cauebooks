import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footerItem">
        <span className="footerTitle">SOCIAL</span>
        <div className="footerSocial">
          <i className="footerIcon fab fa-facebook-square"></i>
          <i className="footerIcon fab fa-twitter-square"></i>
          <i className="footerIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
