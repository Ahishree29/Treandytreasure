import { useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";

function EntryPage() {
  const [islogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex justify-center items-center min-h-screen overflow-auto bg-cover bg-center"
      style={{ backgroundImage: `url("./bglogin.jpg")` }}
    >
      <div className="bg-pink-100 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="flex flex-row">
          <img
            src="./introducing.png"
            alt="introducing"
            className="w-80 mr-10 hidden md:block"
          />
          <div className="flex flex-col items-center">
            <img src="./logo.png" alt="logo" className="w-90 mb-6" />
            {islogin ? (
              <Login setIsLogin={setIsLogin} />
            ) : (
              <SignIn setIsLogin={setIsLogin} />
            )}
            <div className="text-center">
              {islogin ? (
                <p>
                  If not registered{" "}
                  <button
                    className="underline text-pink-800"
                    onClick={() => setIsLogin(false)}
                  >
                    signIn
                  </button>
                </p>
              ) : (
                <p>
                  If already registered{" "}
                  <button
                    className="underline text-pink-800"
                    onClick={() => setIsLogin(true)}
                  >
                    LogIn
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryPage;
