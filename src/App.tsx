import { useEffect, lazy, Suspense } from "react";

import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAllSuburbs } from "./api_calls/admin_api";
import { client } from "./client";
import SteeringLoader from "./components/Loader/SteeringLoader/SteeringLoader";
import { SET_LESSON_PRICE } from "./redux/reducer/reduxNamings";
import FortnightPayments from "./pages/Admin/FortnightPayments/FortnightPayments";
import SentPayments from "./pages/SentPayments/SentPayments";

const AddInstructor = lazy(() => import("./components/AddInstructor/AddInstructor"));
const AdminAgreement = lazy(() => import("./components/AdminAgreement/AdminAgreement"));
const AdminChat = lazy(() => import("./components/AdminChat/AdminChat"));
const AdminInstructorApplication = lazy(
  () => import("./components/AdminInstructorApplication/AdminInstructorApplication")
);
const AdminProtected = lazy(() => import("./components/AdminProtected/AdminProtected"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute/ProtectedRoute"));
const Register = lazy(() => import("./components/Register/Register"));
const NotFoundPage = lazy(() => import("./pages/404Page/NotFoundPage"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const AddToCart = lazy(() => import("./pages/AddToCart/AddToCart"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard/AdminDashboard"));
const AdminApplicants = lazy(() => import("./pages/AdminApplicantsInstructor/AdminApplicants"));
const AdminBookings = lazy(() => import("./pages/AdminBookings/AdminBookings"));
const AdminCars = lazy(() => import("./pages/AdminCars/AdminCars"));
const AdminExpiredInstructor = lazy(() => import("./pages/AdminExpiredUser/AdminExpiredUser"));
const AdminInstructor = lazy(() => import("./pages/AdminInstructor/AdminInstructor"));
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin"));
const AdminSuburbs = lazy(() => import("./pages/AdminSuburbs/AdminSuburbs"));
const AdminUsers = lazy(() => import("./pages/AdminUsers/AdminUsers"));
const ApplicationSuccess = lazy(() => import("./pages/ApplicationSuccess/ApplicationSuccess"));
const ApplyInstructor = lazy(() => import("./pages/ApplyInstructor/ApplyInstructor"));
const BookingInformation = lazy(() => import("./pages/BookingInformation/BookingInformation"));
const BookingPage = lazy(() => import("./pages/BookingPage/BookingPage"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess/BookingSuccess"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword/ForgetPassword"));
const GiftCardPage = lazy(() => import("./pages/GiftCardPage/GiftCardPage"));
const GiftcardSuccess = lazy(() => import("./pages/GiftCardSuccess/GiftcardSuccess"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard/InstructorDashboard"));
const InstructorList = lazy(() => import("./pages/InstructorList/InstructorList"));
const InstructorLogin = lazy(() => import("./pages/InstructorLogin/InstructorLogin"));
const InstructorProfile = lazy(() => import("./pages/InstructorProfile/InstructorProfile"));
const LearnerDashboard = lazy(() => import("./pages/LearnerDashboard/LearnerDashboard"));
const Login = lazy(() => import("./pages/Login/Login"));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage/PasswordResetPage"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess/PaymentSuccess"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsAndCondition = lazy(() => import("./pages/TermsAndCondtion/TermsAndCondition"));
const ViewItemsPage = lazy(() => import("./pages/ViewItemsPage"));
const AdminInstructorEarnings = lazy(() => import("./pages/Admin/InstuctorEarnings/InstructorEarnings"));

// const Homepage = lazy(() => import("./pages/Homepage/Homepage"));

// stripe Promise
const title = {
  test_package: "Where Do You Want To Book Your Test Package?",
  pricing: "Check Pricing of Your Nearby Instructors",
  driving_lesson: "Where Do You Need A Driving Lesson?",
};

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    getLessonPrices();
  }, []);

  const getLessonPrices = async () => {
    const { data } = await client.get("/lesson-price");
    dispatch({ type: SET_LESSON_PRICE, payload: data?.price });
  };

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SteeringLoader />}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/apply-instructor" element={<ApplyInstructor />} />
            <Route path="/driving-lessons" element={<Homepage title={title.driving_lesson} />} />
            <Route path="/driving-lessons/:city" element={<Homepage />} />
            <Route path="/test-package" element={<Homepage title={title.test_package} />} />
            <Route path="/pricing" element={<Homepage title={title.pricing} />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/application-success/:id" element={<ApplicationSuccess />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<PasswordResetPage />} />
            <Route path="/reset-password/instructor/:token" element={<PasswordResetPage instructor />} />
            <Route path="/forget-password/instructor" element={<ForgetPassword instructor={true} />} />
            <Route path="/login" element={<Login instructor={false} />} />
            <Route path="/instructor-login" element={<InstructorLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/instructors-list/:postCode/:transmission/:suburb" element={<InstructorList />} />
            <Route path="/instructor-profile/:id" element={<InstructorProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms/instructor" element={<TermsAndCondition />} />
            <Route path="/terms/learner" element={<TermsAndCondition learner />} />

            {/* protected routes */}
            <Route
              path="/add-cart"
              element={
                <ProtectedRoute location={"/add-cart"}>
                  <AddToCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gift-card"
              element={
                <ProtectedRoute location={"/add-cart"}>
                  <GiftCardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute location={"/checkout"}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking"
              element={
                <ProtectedRoute location={"/booking"}>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-info"
              element={
                <ProtectedRoute location={"/booking-info"}>
                  <BookingInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-success"
              element={
                <ProtectedRoute location={"/payment-success"}>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/giftcard-success"
              element={
                <ProtectedRoute location={"/giftcard-success"}>
                  <GiftcardSuccess />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking-success"
              element={
                <ProtectedRoute location={"/booking-success"}>
                  <BookingSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learner/dashboard"
              element={
                <ProtectedRoute location={"/learner/dashboard"}>
                  <LearnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/dashboard"
              element={
                <ProtectedRoute location={"/instructor/dashboard"}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />

            {/* admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path={"/admin/dashboard"}
              element={
                <AdminProtected location={"/admin/dashboard"}>
                  <AdminDashboard />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/users"}
              element={
                <AdminProtected location={"/admin/users"}>
                  <AdminUsers />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/application/:id"}
              element={
                <AdminProtected location={"/admin/application"}>
                  <AdminInstructorApplication />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/cars"}
              element={
                <AdminProtected location={"/admin/cars"}>
                  <AdminCars />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/bookings"}
              element={
                <AdminProtected location={"/admin/bookings"}>
                  <AdminBookings />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/instructors"}
              element={
                <AdminProtected location={"/admin/instructors"}>
                  <AdminInstructor />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/suburbs"}
              element={
                <AdminProtected location={"/admin/suburbs"}>
                  <AdminSuburbs />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/expired-instructors"}
              element={
                <AdminProtected location={"/admin/expired-instructors"}>
                  <AdminExpiredInstructor />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/add-instructor"}
              element={
                <AdminProtected location={"/admin/add-instructor"}>
                  <AddInstructor />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/instructor-applicants"}
              element={
                <AdminProtected location={"/admin/instructor-applicants"}>
                  <AdminApplicants />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/user/:id"}
              element={
                <AdminProtected location={"/admin/user/:id"}>
                  <ViewItemsPage type={"user"} />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/instructor/:id"}
              element={
                <AdminProtected location={"/admin/instructor/:id"}>
                  <ViewItemsPage type={"instructor"} />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/booking/:id"}
              element={
                <AdminProtected location={"/admin/booking/:id"}>
                  <ViewItemsPage type={"booking"} />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/chat"}
              element={
                <AdminProtected location={"/admin/chat"}>
                  <AdminChat />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/agreement"}
              element={
                <AdminProtected location={"/admin/agreement"}>
                  <AdminAgreement />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/earnings"}
              element={
                <AdminProtected location={"/admin/earnings"}>
                  <AdminInstructorEarnings />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/fortnight-payments"}
              element={
                <AdminProtected location={"/admin/fortnight-payments"}>
                  <FortnightPayments />
                </AdminProtected>
              }
            />
            <Route
              path={"/admin/sent-payments"}
              element={
                <AdminProtected location={"/admin/sent-payments"}>
                  <SentPayments />
                </AdminProtected>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
