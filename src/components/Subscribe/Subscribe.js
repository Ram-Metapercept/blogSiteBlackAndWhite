import React from "react";
const Subscribe = (props) => {
  return (
    <section className="wpo-subscribe-section section-padding">
      <div className="container">
        <div className="wpo-subscribe-wrap">
          <div className="subscribe-text">
            <h3>Never miss any Update!</h3>
            <p>
              Get the freshest headlines and updates sent uninterrupted to your
              inbox.
            </p>
          </div>

          <div className="subscribe-form">
            <form
              id="sib-form"
              method="POST"
              action="https://f3d3e616.sibforms.com/serve/MUIEAC8-hnKM-F4yc8nl44CxFuGQXFsP5wTFB7w99ff5Wv_ZZYjeH3TCDgQrD7Xytxi85ciLsL7U9lemzC3Nu8d7fwzGGKlQQ5oPFPpLm_jmMx_73lX5C6u_nTaOafz2zcQiGqCsPUTh30qGloI954XOyFsJwgz6SXShY_99xrnatZ2exQIYh3FVU1m9otUsjoymY0SI7LuBlw68"
              className="subscribe-form__container"
            >
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  id="EMAIL"
                  name="EMAIL"
                  className="input"
                />
                <label className="input__error"></label>
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
