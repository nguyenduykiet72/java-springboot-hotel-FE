import React from "react"
import { Container } from "react-bootstrap"
import "../../styles/Parallax.css"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1 className="parallax-title">
						Experience the Best Hospitality at <span className="hotel-color">Kisero Hotel</span>
					</h1>
					<h3 className="parallax-subtitle">We offer the best services for all your needs.</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax