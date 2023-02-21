import { createClient } from "@supabase/supabase-js";

export class PlayersServices {
  constructor() {
    this.supabase = createClient(
      "https://tjelkiwfbrbhhugapbkk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWxraXdmYnJiaGh1Z2FwYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTQ5MDYsImV4cCI6MTk5MTY3MDkwNn0.wphTG9taTURxa3nOWc3FUCjtmvXk7AFVpl1Tdp9CX08"
    );
  }

  async createPlayers(values) {
    const res = await this.supabase.from("players").insert([values]);
    return res;
  }

  async getNoPlayers() {
    let res = await this.supabase.rpc("getNumberOfPlayers");
    return res;
  }

  async getPlayers() {
    let res = await this.supabase.from("players").select("*");
    return res;
  }
}

export default new PlayersServices();
