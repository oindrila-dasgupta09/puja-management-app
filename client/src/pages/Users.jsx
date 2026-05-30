function Users() {
  return (
    <div className="min-h-screen bg-slate-100/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-200/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">User center</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Users</h1>
          </div>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            Authentication active
          </span>
        </div>
        <div className="mt-6 space-y-5 text-slate-600">
          <p className="text-base leading-7">
            The backend currently supports secure login and registration. User management data listing is not available in the API yet, but authentication remains fully functional.
          </p>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">What is available</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Secure login and registration routes</li>
              <li>• Protected dashboard access after authentication</li>
              <li>• Existing puja and purohit management flows remain intact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
