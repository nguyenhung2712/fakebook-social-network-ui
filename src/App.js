import React, { useState, useEffect } from "react";
import { Routes, Route ,Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";

import AuthService from "./services/auth.service";
import AuthVerify from "./common/auth-verify";
import PrivateRoute from "./utils/PrivateRoute";
import Event from "./utils/Event";

import Auth from "./components/Auth/Auth";
import PostList from "./components/Post/PostList";
import GroupList from "./components/Group/GroupList";
import GroupCreate from "./components/Group/GroupCreate";
import GroupPage from "./components/Group/GroupPage";
import ProfileComponent from "./components/Profile/ProfileComponent";
import Search from "./components/Search/Search";
import GroupEdit from "./components/Group/GroupEdit";
import ListConversation from "./components/Conversation/ListConversation";

import Navbar from "./Navbar";
import PostDetail from "./components/Post/PostDetail";
import AddUserRole from './components/Admin/UserRole/AddUserRole';
import EditUserRole from './components/Admin/UserRole/EditUserRole';
import UserRoleDataTable from './components/Admin/UserRole/UserRoleDataTable';

import AddGroup from './components/Admin/Group/AddGroup';
import EditGroup from './components/Admin/Group/EditGroup';
import GroupDataTable from './components/Admin/Group/GroupDataTable';
import Chart from "./components/Admin/Statistics/Chart";
import CountRow from './components/Admin/Statistics/CountRow';

import RequesterList from "./components/Friend/ListRequester";

import AdminNavbar from "./adminNavbar";

import { setSocket } from "./redux/actions/SocketActions";
import ConfirmAccount from "./components/ConfirmAccount/ConfirmAccount";

import { SocketProvider, socket } from './utils/SocketContext';
import NotFoundPage from "./components/NotFound/NotFound";
function App() {
  
	const [currentUser, setCurrentUser] = useState(undefined);

	const user = AuthService.getCurrentUser();

	const dispatch = useDispatch();
	dispatch(setSocket(socket));
	
	useEffect(() => {
		
		if (user) {
			setCurrentUser(user);
		}

		Event.on("logout", () => {
			logOut();
		});

		return () => {
			Event.remove("logout");
			socket.close();
		};
	}, []);

	const logOut = () => {
		AuthService.logout();
		setCurrentUser(undefined);
	};

	const AppLayout = () => (
		<>
			<main className={"main--container"}>
				<div className={"main--content"}>
					<div className="theme-layout" style={{height: "100vh"}}>
						{ currentUser &&  <Navbar user={user} currentUser={currentUser} logOut={logOut}/>}
						<div className="mt-5">
							<Outlet/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
	
	  const AdminLayout = () => (
		<>
			<main className={"admin--container"}>
				<div className={"admin--content"}>
					<div className="wrapper">
						<AdminNavbar />
						<Outlet />
					</div>
				</div>
			</main>
		</>
	  );
  

	  const AuthLayout = () => (
		<>
			<main className={"auth--container"}>
				<div className={"auth--content"}>
					<div className="theme-layout" style={{height: "100vh"}}>
						
					
							<Outlet/>
						
					</div>
				</div>
			</main>
		</>
	);
	return (
		<SocketProvider>
			<div>
				<Routes>
					<Route element={<AppLayout />} >
						{
							['/', '/posts'].map((path, index) => <Route key={index} path={path} element={
								<PrivateRoute>
									<PostList />
								</PrivateRoute>} />
							)
						}

						<Route path="/confirm-account/:token" element={<ConfirmAccount />} />			
						<Route path="/detail/post/:postID" element={
							<PrivateRoute>
							<PostDetail />
							</PrivateRoute>
						} />
						<Route path="/groups" element={
							<PrivateRoute>
							<GroupList />
							</PrivateRoute>
						} />
						<Route path="/group/create" element={
							<PrivateRoute>
							<GroupCreate />
							</PrivateRoute>
						} />
						<Route path="/group/:id" element={
							<PrivateRoute>
							<GroupPage />
							</PrivateRoute>
						} />

						<Route path="/group/:id/edit" element={
							<PrivateRoute>
								<GroupEdit />
							</PrivateRoute>
						} />

						<Route path="/profile/:userID" element={
							<PrivateRoute>
							<ProfileComponent />
							</PrivateRoute>
						} />
						<Route path="/conversation" element={
							<PrivateRoute>
							<ListConversation />
							</PrivateRoute>
						} />
						<Route path="/search/:keyword" element={
							<PrivateRoute>
							<Search />
							</PrivateRoute>
						} />

						<Route path="/list-requester/:userID" element={
							<PrivateRoute>
							<RequesterList />
							</PrivateRoute>
						}/>
							
					</Route>

					<Route element={<AuthLayout />} >
					<Route path="/auth" element={<Auth />} />

					</Route>

					<Route element={<AdminLayout />} >
						<Route path="/admin/user-role/read" element={<UserRoleDataTable/>}/>
						<Route path="/admin/user-role/create" element={<AddUserRole/>}/>W
						<Route path="/admin/user-role/edit/:userID/:roleID" element={<EditUserRole/>}/>

						<Route path="/admin/group/read" element={<GroupDataTable/>}/>
						<Route path="/admin/group/create" element={<AddGroup/>}/>
						<Route path="/admin/group/edit/:id" element={<EditGroup/>}/>


						<Route path="/admin/chart" element={<Chart/>}/>
						<Route path="/admin/countRow" element={<CountRow/>}/>    
					</Route>  


					<Route path="*" element={<NotFoundPage />} >
						</Route>
				</Routes>

				<AuthVerify logOut={logOut}/>
			</div>
		</SocketProvider>
		
	)
}
export default App;