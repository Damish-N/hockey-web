import { createClient } from "@supabase/supabase-js";

export class MatchServices {
  constructor() {
    this.supabase = createClient(
      "https://tjelkiwfbrbhhugapbkk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWxraXdmYnJiaGh1Z2FwYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTQ5MDYsImV4cCI6MTk5MTY3MDkwNn0.wphTG9taTURxa3nOWc3FUCjtmvXk7AFVpl1Tdp9CX08"
    );
  }

  async getMatches() {
    const res = await this.supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: false });
    return res;
  }

  async getMatch(id) {
    const { data, error } = await this.supabase
      .from("matches")
      .select("*")
      .eq("id", id);
    return { data, error };
  }
  //    create match
  async createMatch(match) {
    const res = await this.supabase.from("matches").insert(match);
    return res;
  }

  async getNumberOfMatches() {
    const res = await this.supabase.rpc("getNumberOfMatches");
    return res;
  }
}

export default new MatchServices();
