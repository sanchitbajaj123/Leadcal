    import React from 'react';
    import '../styles/Home.css';  // Custom CSS for the Home page
    import Navbar from './Navbar';
    import { useNavigate } from 'react-router-dom';

    const Home = () => {
    
    const show=()=>{
        alert('Elevate your meals with our flavorful sauces, crafted from premium ingredients to add a perfect touch of spice, sweetness, or smokiness to any dish')
    }

    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate('/products')
    }
    return (
    <div className="home">
    <Navbar/>
    {/* Hero Section */}
    <header className="hero-section">
    <div className="hero-text">
    <h1>Welcome to JMBM Trading Company</h1>
    <p>Explore a world of rich, flavorful sauces for every dish</p>
    <button onClick={handleClick} className="shop-now-btn">Shop Now</button>
    </div>
    </header>

    {/* Sauce Categories */}
    <section className="categories">
    <h2>Explore Our Sauce Categories</h2>
    <div className="category-cards">
    <div className="category-card">
    <img src="https://www.seriouseats.com/thmb/bBc2VrbGRGigMXBzcRpUP8-CwUc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__02__20210128-fermented-hot-sauce-charred-fresno-tamari-vicky-wasik-ec8e5f05468443f9adc456686fbff1c9.jpg" alt="Spicy Sauces" />
    <h3>Spicy Sauces</h3>
    
    </div>

    <div className="category-card">

    <img src="https://thumbs.dreamstime.com/z/thai-sweet-chili-sauce-isolated-white-background-glass-bottle-golden-twist-off-screw-cap-no-label-glass-bottle-thai-281719998.jpg" alt="Sweet Sauces" />

    <h3>Sweet Sauces</h3>

    </div>

    <div className="category-card">

    <img src="https://www.noracooks.com/wp-content/uploads/2018/03/IMG_5720.jpg" alt="Barbecue Sauces" />

    <h3>Barbecue Sauces</h3>

    </div>

    </div>

    </section>

    {/* Featured Products */}

    <section className="featured-products">

    <h2>Featured Sauces</h2>

    <div className="product-cards">

    <div className="product-card">

    <img src="https://pngimg.com/d/sauce_PNG110.png" alt="Hot Sauce" />

    <h3>Inferno Hot Sauce</h3>

    <p>Rs 1299 </p>

    <button onClick={show}className="view-details-btn">View Details</button>

    </div>

    <div className="product-card">
       
    <img src="https://pngimg.com/d/sauce_PNG110.png" alt="BBQ Sauce" />
    <h3>Smokey BBQ Sauce</h3>
    <p>Rs 999</p>
    <button onClick={show} className="view-details-btn">View Details</button>
    </div>
    <div className="product-card">
    <img src="https://pngimg.com/d/sauce_PNG110.png" alt="Sweet Sauce" />
    <h3>Golden Honey Sauce</h3>
    <p>Rs 899</p>
    <button onClick={show}  className="view-details-btn">View Details</button>
    </div>
    </div>
    </section>
{/* About Us Section */}
    <section className="about-us">
    <h2>About JMBM Trading Company</h2>
    <p>
    At JMBM Trading Company, we believe that the perfect sauce can make any meal memorable. Our sauces are crafted with love and high-quality ingredients to bring flavor and excitement to your cooking.
    </p>
    </section>
    <section className="our-story">
        <h2>Our Story</h2>
        <p>
          JMBM Trading Company started with a simple passion for elevating meals. From our humble beginnings
          to becoming a trusted brand, our mission has always been to provide the finest sauces that bring joy to every
          bite. Discover our journey and become a part of our flavorful story.
        </p>
      </section>

      {/* Address Section */}
      <section className="address">
        <h2>Contact Us</h2>
        <p>
          JMBM Trading Company <br />
          123 Patti Dogar,Kaithal,Haryana(136027)<br />
          Email: info@jmbmtrading.com | Phone: 1800-11-7852
        </p>
      </section>
{/* Special Promotions */}
    <section className="special-promotions">
    <h2>Special Promotions</h2>
    <div className="promotion-cards">
    <div className="promotion-card">
    <h3>Buy 2 Get 1 Free on All Spicy Sauces!</h3>
    <p>Hurry, offer ends soon!</p>
    <button onClick={(e)=>{
        window.location.href='/products'
    }} className="shop-now-btn">Shop Spicy Sauces</button>
    </div>
    <div className="promotion-card">
    <h3>10% Off Your First Order</h3>
    <p>Sign up for our newsletter to claim your discount</p>
    <button onClick={(e)=>{
        window.location.href='/'
    }} className="cta-btn">Sign Up Now</button>
    
    </div>
    
    </div>
    
    </section>
    </div>
  );
};
export default Home;