import { type User } from "firebase/auth";

type AuthUserProps = {
  user: User;
  logout: () => void;
  className?: string;
};

const AuthUser = ({ user, logout, className }: AuthUserProps) => {
  const { displayName, email, uid } = user;
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <div className="flex flex-col items-end">
        <span className="text-2xl font-bold">{displayName}</span>
        <span className="text-base">{email}</span>
        <span className="text-base text-stone-500">UID: {uid}</span>
      </div>
      <button
        className="inline-flex items-center self-end rounded-md border border-stone-200 bg-stone-50 px-3 py-2 font-bold text-[#582924] shadow-sm transition hover:bg-[#301411] hover:text-stone-50 hover:cursor-pointer"
        onClick={logout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
          ></path>
        </svg>
        <span>&nbsp; Log Out</span>
      </button>
    </div>
  );
};

export default AuthUser;
