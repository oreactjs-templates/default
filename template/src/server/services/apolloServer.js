import config from "../config";
import fs from "fs";
import path from "path";
import {printSchema} from "graphql";
import schema from "../graphql/schema";
import {ApolloServer} from "apollo-server-express";
import {buildContext} from "graphql-passport";

export const initializeApollo = () => {

    if (config.env !== 'production')
        fs.writeFileSync(path.resolve(__dirname, '../schema.graphql'), printSchema(schema, {commentDescriptions: true}));

    return  new ApolloServer({
        playground: false,
        schema,
        context: ({req, res}) => buildContext({req, res})
    });
}
