import homeImg from "../../images/landing-1.png"

export const AdminHome = () => {

  return (
    <>
      <div className="home-admin-container">



        <div className="img-container" >

          <img className="img-landing" src={homeImg} alt="landing" />
          <div className="text-container">
            <h1> The Royal Hospital </h1>
            <p> Reiciendis, accusamus! Commodi quo odit magni quisquam et sint, cupiditate perspiciatis ad aliquid repudiandae harum ex recusandae, blanditiis distinctio est nihil aperiam.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <hr />
        <div className="bottom-container">
          <div className="bottom-item"><h1>About</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Contact</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>
          <div className="bottom-item"><h1>Location</h1><h4>Lorem ipsum dolor sit amet consectetur adipisicing elit, consectetur adipisicing elitconsectetur adipisicing elit.</h4></div>

        </div>

      </div>

    </>
  );
};
