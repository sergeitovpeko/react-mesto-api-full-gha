import React from "react"

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
      &copy; {new Date().getFullYear()}. Сергей Товпеко
      </p>
    </footer>
  )
}

export default Footer
