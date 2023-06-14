import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import appleLogo from "../../assets/apple.svg";
import facebookLogo from "../../assets/facebook.svg";
import googleLogo from "../../assets/google.svg";
import loginGo from "../../assets/login-go.png";
import { toastError } from "../../helpers/errorHandling";
import { LoginRequest, useLoginMutation } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";

function LoginFrame() {
  const [login, { isLoading }] = useLoginMutation();

  const [formState, setFormState] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await login(formState).unwrap();
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className="card w-full max-w-md shadow-2xl bg-base-100 self-center m-auto">
      <div className="card-body">
        <div className="flex justify-between">
          <div>
            Welcome to <span className="text-primary uppercase">Lorem</span>
          </div>
          <div className="label-text-alt">
            <div className="text-slate-400">No account ?</div>
            <Link to="/signup" className="link link-hover link-primary">
              Sign up
            </Link>
          </div>
        </div>

        <div className="card-title prose mb-10">
          <h1>Sign in!</h1>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="flex-1 btn btn-base bg-blue-100 text-blue-500 border-none normal-case font-normal">
            <img src={googleLogo} alt="google logo" width={26} height={26} />

            <span className="hidden min-[420px]:inline">Sign in</span>
            <span className="-ml-1 hidden min-[380px]:inline">with Google</span>
          </button>
          <button className="btn btn-base">
            <img
              src={facebookLogo}
              alt="facebook logo"
              width={26}
              height={26}
            />
          </button>
          <button className="btn btn-base">
            <img src={appleLogo} alt="apple logo" width={26} height={26} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Enter your Email address</span>
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email address"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter your Password</span>
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
            />
            <label className="label justify-end">
              <Link
                to="/forgot"
                className="label-text-alt link link-primary link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary normal-case">
              Sign in
              {isLoading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="navbar bg-primary">
      <div>daisyUI</div>
    </div>
  );
}

export default function Login() {
  const user = useAuth();
  const location = useLocation();

  if (user.user) return <Navigate to="/" state={{ from: location }} />;

  return (
    <>
      <div className="h-full grid grid-rows-[1fr_1fr] absolute w-full -z-10">
        <div className="bg-primary h-full">
          <Nav />
        </div>
      </div>

      <div className="p-4 sm:p-0 grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] h-full">
        <div className="h-full overflow-hidden hidden md:grid grid-rows-[1fr_1fr] relative">
          <div className="flex">
            <article className="prose p-14 pr-2 self-center max-w-[65%] text-white">
              <h2 className="text-white font-medium mb-0">Sign in to</h2>
              <h3 className="text-white font-normal">Lorem Ipsum is simply</h3>
              <p className="font-thin">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </article>
            <div className="flex align-middle absolute -right-[5%] -z-10">
              <img
                height={300}
                width={300}
                className="object-contain"
                alt="login go"
                src={loginGo}
              />
            </div>
          </div>
        </div>
        <LoginFrame />
      </div>
    </>
  );
}
