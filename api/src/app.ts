import express, { Request, Response } from "express";
import log from "./utils/logger";
import cors from "cors";
import { MiddleWareProps } from "./types";
import corsOption from "./config/corsOptions";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { serverConfig } from "./config/connection";
import { swaggerDocs } from "./utils/swagger";
import caseRouter from "./routes/cases"
import beneficiaryRouter from "./routes/beneficiaries"
import authRouter from "./routes/auth"
import addressRouter from "./routes/address"


const app = express();
//Middlewares
app.use(({ req, res, next }: MiddleWareProps) => {
  //@ts-ignore
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// give the app the ability to use json
app.use(express.json());

// enable cors for dynamic routes
app.use(cors(corsOption));

// enable app to parse cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//---------------------Routes------------------------------
app.use("/test", async (req: Request, res: Response) => {
  const users = await serverConfig.db("address");
  return res.status(200).json(users);
});
app.use("/cases", caseRouter);
app.use("/beneficiaries", beneficiaryRouter);
app.use("/auth", authRouter);
app.use("/address", addressRouter);



//---------------------Routes------------------------------

app.listen(serverConfig.port, () => {
  log.info(`app is running at http://localhost:${serverConfig.port}`);
});

swaggerDocs(app, Number(serverConfig.port));
