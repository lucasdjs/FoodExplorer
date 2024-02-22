import macarrom from '../assets/macarrom.png';
import '../Styles/SlideShow.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SlideShow() {
    const slides = [macarrom];

    return (
        <div className='container'>
            <Swiper>
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="slide-container">
                            <div className="image-container">
                                <img src={slide} alt={slide} />
                            </div>
                            <div className="text-container">
                                <h3>Sabores inigualáveis</h3>
                                <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideShow;
