import { createClient } from "@supabase/supabase-js";
import x from "../../src/asserts/logo.png";

export class CashManagementServices {
  constructor() {
    this.supabase = createClient(
      "https://tjelkiwfbrbhhugapbkk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWxraXdmYnJiaGh1Z2FwYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTQ5MDYsImV4cCI6MTk5MTY3MDkwNn0.wphTG9taTURxa3nOWc3FUCjtmvXk7AFVpl1Tdp9CX08"
    );
  }
  async getTransactions() {
    const res = await this.supabase.from("transactions").select("*");
    return res;
  }

  async getTransactionWithUser() {
    // const query = `select * from "transactions" inner join "players" on transactions.created = players."authId"`;
    const response = await this.supabase
      .from("transactionwithauthuser")
      .select("*");
    return response;
  }

  async putSlip(nameOfId, data) {
    console.log(data);
    const response = await this.supabase.storage
      .from("images")
      .upload("receipts/" + nameOfId, data, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });
    return response;
  }

  async insertCashManagement(data) {
    const response = await this.supabase.from("transactions").insert(data);
    return response;
  }
}

export default new CashManagementServices();
