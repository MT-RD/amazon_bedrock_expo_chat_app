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
const myRestApi = new RestApi(apiStack, "RestApi", {});
