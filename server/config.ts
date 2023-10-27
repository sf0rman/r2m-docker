import { config } from "dotenv";
import { z } from "zod";

config({ path: "./.env" });
const Config = z.object({
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_URL: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string().default("r2mdemo"),
  APP_PORT: z.coerce.number().default(8080),
});
type Config = z.infer<typeof Config>;

export const cfg = Config.parse(process.env);
