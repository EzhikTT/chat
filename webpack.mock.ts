import webpackMockServer from "webpack-mock-server";
import nodePath from "path";
import cors from 'cors';

export default webpackMockServer.add((app, helper) => {
  app.use(cors())
  app.get("/test", (_req, res) => {
    res.sendFile(nodePath.join(__dirname, "/mocks/chat.json"));
  });
});