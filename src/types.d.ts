type TCurrentUser = {
  user_id: number,
  email: string,
  role: string
};

type TLocation = {
  country?: string,
  state?: string,
  city?: string,
  address?: string,
  zip_code?: string,
  details?: string
};

type TCurrentCustomer = {
  username?: string,
  first_name?: string,
  last_name?: string,
  slug?: string,
  phone_number?: string,
  profile_picture?: string,
  user_id?: number
};

type TCurrentMerchant = {
  merchant_name?: string,
  slug?: string,
  phone_number?: string,
  tax_id?: string,
  description?: string,
  profile_picture?: string,
  background_picture?: string,
  user_id?: number
};

type TContextProps = {
  currentUser: TCurrentUser | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<TCurrentUser | null>>,
  handleCurrentUser: () => void,
  location: TLocation | null,
  setLocation: React.Dispatch<React.SetStateAction<TLocation | null>>,
  handleLocation: () => void
};