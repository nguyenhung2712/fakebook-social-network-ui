import React, { useState } from "react";

import Register from "./Register";
import Login from "./Login";

const Auth = () => {
	
    const [isRegistered,setIsRegistered] = useState(false);

    return (
        <div className="row merged">
			<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className="land-featurearea">
					<div className="land-meta">
						<h1>Winku</h1>
						<p>
							Winku is free to use for as long as you want with two active projects.
						</p>
						<div className="friend-logo w-50">
							<span><img src="https://th.bing.com/th/id/R.6858bf347747f582200b5fec85e858d4?rik=PA%2bsB0iH7jUJhg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-HSPp0ZCZDVU%2fU-krsBKK2oI%2fAAAAAAAABv0%2fDMYOT49tSvo%2fs1600%2ffacebook%2blike%2blogo.png&ehk=GOqOvfHFkRoSDDqUuN%2fmMEXLJ0wnQfM5IZ7JZJSdUx0%3d&risl=&pid=ImgRaw&r=0" alt=""/></span>
						</div>
					</div>	
				</div>
			</div>
		
      		<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div className="login-reg-bg">  
					{
						!isRegistered
						? 	<div className="log-reg-area sign">
								<Login onSetIsRegistered={setIsRegistered} />
							</div>
						:	<div className="log-reg-area">
								<Register onSetIsRegistered={setIsRegistered} />
							</div>
					}
				</div>
			</div>
		</div>
    )
}

export default Auth;