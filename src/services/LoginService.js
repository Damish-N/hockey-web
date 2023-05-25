import { createClient } from "@supabase/supabase-js";

export class LoginService {
  constructor() {
    this._isAuthenticated = false;
    this.supabase = createClient(
      "https://tjelkiwfbrbhhugapbkk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWxraXdmYnJiaGh1Z2FwYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTQ5MDYsImV4cCI6MTk5MTY3MDkwNn0.wphTG9taTURxa3nOWc3FUCjtmvXk7AFVpl1Tdp9CX08"
    );
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(value) {
    this._isAuthenticated = value;
  }

  async login(values) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    return { data, error };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
    // this._isAuthenticated = false;
  }

  async register(values) {
    const { data, error } = await this.supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    return { data, error };
  }
}

export default new LoginService();
