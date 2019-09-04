require("dotenv").config();

export const config = {
  secrets: {
    jwt: "wooooitsalovelything"
  },
  dbUrl: process.env.dbUrl
};
