import React from 'react'
import "./style.css";
import {Link} from "react-router-dom";

function NotFoundPage() {
  return (

<section className="not-found">
<div className="page-wrap d-flex flex-row align-items-center">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block text-bold">404</span>
                <div className="mb-4 lead">
					<span className="text-bold">The page you are looking for was not found.
					</span>
					</div>
                <Link to="/">
					<button className="btn btn-primary">Go back home</button>
				</Link>
            </div>
        </div>
    </div>
</div>
</section>

  )
}
export default NotFoundPage