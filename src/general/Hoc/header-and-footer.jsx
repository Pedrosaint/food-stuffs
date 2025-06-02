import { Footer } from "../Hoc/footer";
import { Header } from "../Hoc/header";

const withLayout = (WrappedComponent) => {
  const Layout = (props) => {
    return (
      <>
        <Header />
        <div className="">
          <WrappedComponent {...props} />
        </div>
        <Footer />
      </>
    );
  };

  return Layout;
};

export default withLayout;
