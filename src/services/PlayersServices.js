import { createClient } from "@supabase/supabase-js";

export class PlayersServices {
  constructor() {
    function formatDate(inputDate) {
      let date, month, year;

      date = inputDate.getDate();
      month = inputDate.getMonth() + 1;
      year = inputDate.getFullYear();

      date = date.toString().padStart(2, "0");

      month = month.toString().padStart(2, "0");

      return `${year}-${month}-${date}`;
    }

    this.toDay = formatDate(new Date());
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

  async getAttendance() {
    try {
      // let res = await this.supabase
      //   .from("public.getAttendanceToday")
      //   .select("*");
      const res = await this.supabase
        .from("attendance")
        .select("*,players(firstName,lastName,faculty)")
        .eq("date", this.toDay);
      // console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async updateAttendance(id: number, attend: boolean) {
    try {
      const res = await this.supabase
        .from("attendance")
        .update({ attend: attend })
        .eq("id", id);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async createATask(values) {
    try {
      const res = await this.supabase.from("tasks").insert([values]);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async getTasks() {
    try {
      const res = await this.supabase
        .from("tasks")
        .select("*")
        .eq("completionDate", this.toDay)
        .eq("status", false);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async updateTask(values) {
    try {
      const res = await this.supabase
        .from("tasks")
        .update({ status: true })
        .eq("id", values.id);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new PlayersServices();
