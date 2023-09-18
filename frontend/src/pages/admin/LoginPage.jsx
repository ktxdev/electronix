import LoginForm from "../../components/LoginForm";
import loginBg from "../../assets/images/login-bg.jpeg";

function LoginPage() {
  return (
    <div className="tp-main-wrapper h-screen">
      <div className="container mx-auto my-auto h-full flex items-center justify-center">
        <div className="pt-28 pb-28">
          <div className="grid grid-cols-12 shadow-lg bg-white overflow-hidden rounded-md ">
            <div className="col-span-4 lg:col-span-6 relative h-full hidden lg:block">
              <div
                className="data-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
                data-bg="assets/img/bg/login-bg.jpg"
                style={{ backgroundImage: `url(${loginBg})` }}
              ></div>
            </div>
            <div className="col-span-12 lg:col-span-6 md:w-[500px] mx-auto my-auto pt-12 py-16 px-5 md:px-[60px]">
              <div className="text-center">
                <h4 className="mb-1 text-2xl">Login Now.</h4>
              </div>
              <div className="h-px my-6 flex-1 bg-slate-200"></div>
              <div className="">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
