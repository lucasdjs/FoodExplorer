import React from 'react';
import { Hexagon } from 'lucide-react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row align-items-start">
        <div className="col logoFooter">
          <Hexagon size={20} className="hexagon" />
          food explorer
        </div>
        <div className="col footerRights">
          © 2023 - Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
