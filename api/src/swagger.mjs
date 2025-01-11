import swaggerAutoGen from "swagger-autogen";

const doc = {
  info: {
    title: "formtopia",
    description: "API documentation for formtopia application",
  },
  host: "localhost:8000",
  basePath: "/api/v1/",
};

const outputFile = "./swagger.json";
const routes = [
  "./modules/health-check.ts",
  "./modules/auth/auth.routes.ts",
  "./modules/chat/chat.routes.ts",
];

swaggerAutoGen()(outputFile, routes, doc);
