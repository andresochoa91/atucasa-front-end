type TCurrentUser = {
  user_id: number,
  email: string,
  role: string
};

type TCurrentCustomer = {
  username: string,
  first_name: string,
  last_name: string,
  slug: string,
  phone_number: string,
  profile_picture: string,
  user_id: number
};

type TContextProps = {
  currentUser: TCurrentUser | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<TCurrentUser | null>>,
  handleCurrentUser: () => void
};