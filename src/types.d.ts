type TCurrentUser = {
  // token: string,
  user_id: number,
  email: string,
  role: string
};

type TContextProps = {
  currentUser: TCurrentUser | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<TCurrentUser | null>>
};