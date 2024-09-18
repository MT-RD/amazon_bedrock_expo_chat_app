import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import {
  Cors,
  LambdaIntegration,
  RestApi,
  MethodLoggingLevel,
  AuthorizationType,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { myApiFunction } from "./functions/api-function/resource";

const backend = defineBackend({
  myApiFunction,
});

// Create a new API stack
const apiStack = backend.createStack("api-stack");

// Create a new REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "myRestApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
    loggingLevel: MethodLoggingLevel.INFO, // Enable logging for debugging
  },
  // CORS configuration
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Allow all origins. Restrict this to domains you trust in production.
    allowMethods: Cors.ALL_METHODS, // Allow all HTTP methods. Restrict this to the methods you need in production.
    allowHeaders: Cors.DEFAULT_HEADERS, // Allow all headers. Specify only the headers you need in production.
  },
  defaultMethodOptions: {
    authorizationType: AuthorizationType.NONE, // API is open to unauthenticated access. Consider implementing authentication and authorization if required.
  },
});

// Create a new Lambda integration
const lambdaIntegration = new LambdaIntegration(
  backend.myApiFunction.resources.lambda
);

// Create a new resource path for chat interactions
const chatPath = myRestApi.root.addResource("chat");
