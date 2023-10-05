export default function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h1 className="text-2xl">Register</h1>
        </div>
      </div>
      <form>
        <div className="row margin-bottom-1">
          <div className="column-half">
            <label className="margin-bottom-1 d-block">
              Username
              <input
                required
                name="username"
                type="text"
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
              />
            </label>
            <label className="margin-bottom-1 d-block">
              Password
              <input
                required
                name="password"
                type="password"
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column-full d-flex justify-between">
            <button className="border-solid border-white">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}

// <form onSubmit={handleSubmit}>
{
  /* <button
              disabled={isLoading}
              className="input-b-radius text-padding purple-background white-text">
              Register
            </button> */
}
