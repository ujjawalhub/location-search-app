import React from 'react';
import Search from '../../components/Search/Search';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="home__body">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Logo" />

                <div className="home__inputContainer">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Home;