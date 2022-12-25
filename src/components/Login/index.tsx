export function Login() {
  return (
    <>
      <h1 className="text-lg font-bold">Login with your account</h1>
      <form className="grid gap-4 mt-6">
        <div className="grid gap-0.5 text-slate-900 dark:text-white">
          <label htmlFor="email">E-mail</label>
          <input
            className="h-10 rounded-[5px] p-2 bg-transparent border-2 border-[#494C6B] 
            outline-none"
            type="text"
            id="email"
          />
        </div>
        <div className="grid gap-0.5 text-slate-900 dark:text-white">
          <label htmlFor="password">Password</label>
          <input
            className="h-10 rounded-[5px] p-2 bg-transparent border-2 border-[#494C6B] 
            outline-none"
            type="password"
            id="password"
          />
        </div>
        <div>
          <button
            className="h-12 bg-[#4c23d3] hover:bg-[#724deb] active:bg-[#724deb] 
            w-32 rounded text-white font-bold mt-2"
            type="submit"
          >
            Login
          </button>
          <p className="underline mt-6">Click here to create a account</p>
        </div>
      </form>
    </>
  );
}
