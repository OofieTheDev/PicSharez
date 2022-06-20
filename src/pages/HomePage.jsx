import IntroPic from "../images/intro-red.svg";

export default function HomePage() {
    return (
        <section className='home'>
            <div className="home-grid">
                <div className='home-pic-div'>
                    <img src={IntroPic} alt="" />
                </div>
                <div className='home-words-div'>
                    <h1>Share your <span>favourite</span> moments with the <span>world</span></h1>
                    {/* <h6>Capture. Upload. Share.</h6> */}
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat tempore id delectus dolores neque sunt officia expedita? Quae incidunt reprehenderit nulla voluptates. Deleniti, cum tenetur quo exercitationem consectetur nesciunt odio?</p>
                    <button className='pic-btn'>Start Sharing<i className="fas fa-arrow-right intro-arrow"></i></button>
                </div>
            </div>
        </section>
    )
}