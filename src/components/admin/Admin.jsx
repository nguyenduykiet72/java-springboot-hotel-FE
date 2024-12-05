import React from "react"
import { Link } from "react-router-dom"
import { FaHotel, FaBookOpen } from "react-icons/fa"
import "../../styles/Admin.css"

const Admin = () => {
	return (
		<section className="container mt-5">
			<div className="card shadow-sm">
				<div className="card-body">
					<h2 className="text-center mb-4">
						<i className="fas fa-user-shield"></i> Admin Dashboard
					</h2>
					<hr />
					
					<div className="row mt-4">
						<div className="col-md-6 mb-3">
							<div className="card h-100 hover-shadow">
								<div className="card-body text-center">
									<FaHotel className="display-4 text-primary mb-3" />
									<h3 className="h5">Room Management</h3>
									<p className="text-muted">Manage hotel rooms, types, and pricing</p>
									<Link 
										to="/existing-rooms" 
										className="btn btn-primary"
									>
										Manage Rooms
									</Link>
								</div>
							</div>
						</div>

						<div className="col-md-6 mb-3">
							<div className="card h-100 hover-shadow">
								<div className="card-body text-center">
									<FaBookOpen className="display-4 text-success mb-3" />
									<h3 className="h5">Booking Management</h3>
									<p className="text-muted">View and manage room bookings</p>
									<Link 
										to="/existing-bookings" 
										className="btn btn-success"
									>
										Manage Bookings
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Admin