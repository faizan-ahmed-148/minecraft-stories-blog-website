import "./globals.scss";
import "./_variable.scss";
import "./injectAtRoot"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill-new/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import 'quill-table-better/dist/quill-table-better.css'
import "react-toastify/dist/ReactToastify.css";
import Providers from "./Providers";
import dynamic from "next/dynamic";
import AuthProvider from "./Components/Helper/AuthProvider";
import { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingBar from "./Components/LoadingBar/LoadingBar";
import Loading from "./Components/Helper/Loading";
import { WebVitals } from "./lib/web-vitals";
export const metadata = {
  robots: "index, follow",
};

const Header = dynamic(() => import("./Components/Header/Header"), {
  loading: () => <Loading />,
});
const Footer = dynamic(() => import("./Components/Footer/Footer"), {
  loading: () => <Loading />,
});

const ReactNotificationComponent = dynamic(() => import('./Components/ReactNottification'), {
  loading: () => <Loading />,
});
const MainApp = dynamic(() => import('./MainApp'), {
  loading: () => <Loading />,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <LoadingBar />
        <AuthProvider>
          <Providers>
          <WebVitals />
                <MainApp>
              <ReactNotificationComponent>
                  <Header />
                  {children}
                  <Footer />
              </ReactNotificationComponent>
                </MainApp>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
