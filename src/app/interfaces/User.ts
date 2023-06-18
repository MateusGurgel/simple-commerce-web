export default interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  token: string;
  created_at: Date;
  updated_at: Date;
}
