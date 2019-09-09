import React from 'react';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

const users = [
  {
    name: `Param`,
  },
  {
    name: `Vennila`,
  },
  {
    name: `Afrin`,
  },
];

const UsersPage = () => {
  return (
    <>
      <h3>Users Page</h3>
      {users.map((user, index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
        </h5>
      ))}
    </>
  );
};

const IndexPage = () => {
  return (
    <h3>Home Page</h3>
  );
};

const AboutPage = () => {
  return (
    <h3>About Page</h3>
  );
};

// Getting the userId from match props and display the user from the users array
const UserPage = ({ match, location }) => {
  const { params: { userId } } = match;

  return (
    <>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {users[userId - 1].name}
      </p>
    </>
  );
};

const SearchPage = ({ match, location }) => {
  return (
    <p>
      <strong>Query Params: </strong>
      {location.search}
    </p>
  );
};

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

const PropsPage = ({ title }) => {
  return (
    <h3>{title}</h3>
  );
};

const RedirectPage = () => {
  return (
    <h3>Redirect Page</h3>
  );
};

const AuthPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <h3>User not loggedin</h3>;
  }
};

const DashboardPage = () => {
  return <h3>Dashboard Page</h3>;
};

const App = () => {
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
        <Link to="/search?q=react">Search</Link>
        <Link to="/props-through-render">Props through render</Link>
        <Link to="/new-route">Redirecting to New page</Link>
        <Link to="/auth-not-loggedin">Not Loggedin</Link>
        <Link to="/auth-loggedin">User Loggedin</Link>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/users" component={UsersPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/user/:userId" component={UserPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/props-through-render" render={(props) => <PropsPage {...props} title={`Props through render`} />} />
          <Route exact path="/new-route" component={RedirectPage} />
          // Route definition for Dashboard
          <Route exact path="/dashboard" component={DashboardPage} />
          // Route definition for not loggedin page by passing IsLoggedIn props as false
          <Route exact path="/auth-not-loggedin" render={(props) => <AuthPage {...props} isLoggedIn={false} />} />
          // Route definition for loggedin page by passing IsLoggedIn props as true. This route will automatically redirect to dashboard because of the condition
          <Route exact path="/auth-loggedin" render={(props) => <AuthPage {...props} isLoggedIn={true} />} /> 
          <Route component={NoMatchPage} />
          <Redirect from="/old-route" to="/new-route" />
        </Switch>
      </Router>
    </section>
  );
};

export default App;
