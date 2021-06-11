import './contactPage.css';


export const ContactsPage: React.FC = () => {
    return (
        <div className='contact-page'>
            <div className='contact-data'>
                <div className='data-part'>
                    <h4 className="line">OPERATING MODE:</h4>
                    <div className='two-columns'>
                        <h5 className='bold-text'>Mon - Fri</h5>
                        <h5>09:00 - 23:00</h5>
                        <h5 className='bold-text'>Sat - Sun</h5>
                        <h5>10:00 - 17:00</h5>
                    </div>
                </div>
                <div className='data-part'>
                    <h4 className="line">PHONE NUMBERS:</h4>
                    <h5>+ 375(44) 123-45-67</h5>
                    <h5>+ 375(44) 987-65-43</h5>
                </div>
            </div>
            <div className='data-part'>
                <h4 className='line'>STORE ADDRESS:</h4>
                <div className='two-columns'>
                    <h5 className='bold-text'>Country:</h5>
                    <h5> Belarus</h5>
                    <h5 className='bold-text'>City:</h5>
                    <h5>Minsk</h5>
                    <h5 className='bold-text'>Street:</h5>
                    <h5>Tolstoy street</h5>
                    <h5 className='bold-text'>House number:</h5>
                    <h5>10</h5>
                </div>
            </div>
            <div className='map'>
                <div className="data-part" style={{position: "relative", overflow: "hidden"}}><a
                    href="https://yandex.by/maps/157/minsk/?utm_medium=mapframe&utm_source=maps"
                    style={{color: "#eee", fontSize: "12px", position: "absolute", top: "0px"}}>Минск</a><a
                    href="https://yandex.by/maps/157/minsk/house/Zk4YcwNkSkUCQFtpfXR5eX9mZQ==/?ll=27.544305%2C53.888351&source=wizgeo&utm_medium=mapframe&utm_source=maps&z=16.55"
                    style={{color: "#eee", fontSize: "12px", position: "absolute", top: "14px"}}>Улица Толстого, 10 —
                    Яндекс.Карты</a>
                    <iframe src="https://yandex.by/map-widget/v1/-/CCUab6sdDA" width="1000" height="400" frameBorder="1"
                            allowFullScreen={true} style={{position: "relative"}}></iframe>
                </div>
            </div>
        </div>
    )
};