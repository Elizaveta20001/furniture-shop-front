import './footer.css';

const Footer = () => {

    return (
      <>
        <footer className="page-footer footer-background">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Furniture shop</h5>
                <p className="grey-text text-lighten-4">The best furniture sales company.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Social networks</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Telegram</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Instagram</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Facebook</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">VK</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2021 Copyright Furniture shop
            </div>
          </div>
        </footer>
      </>
    )
};


export default Footer;