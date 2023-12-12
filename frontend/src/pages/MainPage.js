import React from "react";

export const MainPage = () => {
    return(
        <div>
            <h1>распродажа сепулек!</h1>
            <div className="row">
                <a href="/item/6577ddf5f419cd18d51aa319" className="card">
                    <div className="card-image">
                        <img src="https://i.pinimg.com/564x/52/fd/ab/52fdab1d799bd183df41ba89d59351e8.jpg" alt="sepul1" />
                    </div>
                    <div className="card-content">
                        <p>сепулька.</p>
                    </div>
                </a>
                <a href="/item/6577ddf6f419cd18d51aa31c" className="card">
                    <div className="card-image">
                        <img src="https://i.pinimg.com/564x/36/d0/2c/36d02c695ae7ad71c97785da2811089f.jpg" alt="sepul1" />
                    </div>
                    <div className="card-content">
                        <p>сепулька.</p>
                    </div>
                </a>
                <a href="/item/6577ddf6f419cd18d51aa31f" className="card">
                    <div className="card-image">
                        <img src="https://i.pinimg.com/564x/1a/63/95/1a6395c5286a475165966ecde7c2176c.jpg" alt="sepul3" />
                    </div>
                    <div className="card-content">
                        <p>сепулька.</p>
                    </div>
                </a>
            </div>
        </div>
    )
}