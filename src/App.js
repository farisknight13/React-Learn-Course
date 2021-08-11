import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import UserStoreProvider from "./context/UserContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import IndexPage from "./pages/category/IndexPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";

//redux setup
import { Provider } from "react-redux";
//thunk setup
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// const store = createStore(rootReducer, applyMiddleware(thunk));

// import { createStore } from "redux";
// import rootReducer from "./redux/reducers/index";
import CartPage from "./pages/CartPage";

// const store = createStore(rootReducer); No use persist
import configureStore from './redux/configureStore'
import PDFReport from "./pages/report/PDFReport";
import ChartReport from "./pages/report/ChartReport";
const { store } = configureStore()

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <UserStoreProvider>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={3000}
          placement="top-center"
        >
          <QueryClientProvider client={queryClient}>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/product">
                  <ProductPage />
                </Route>
                <Route path="/detail/:id/title/:title">
                  <DetailPage />
                </Route>
                <Route path="/hospital">
                  <HospitalPage />
                </Route>
                <Route path="/upload">
                  <UploadPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <PrivateRoute path="/member">
                  <MemberPage />
                </PrivateRoute>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/pdf">
                  <PDFReport />
                </Route>
                <Route path="/chart">
                  <ChartReport />
                </Route>
                <Route
                  path="/category"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} exact>
                        <IndexPage />
                      </Route>
                      <Route path={`${url}/create`} exact>
                        <CreatePage />
                      </Route>
                      <Route path={`${url}/edit/:id`} exact>
                        <EditPage />
                      </Route>
                    </>
                  )}
                ></Route>
              </Switch>
              <Footer />
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;
