import Express from 'express';
import ExpressGraphQL from 'express-graphql';
import Schema from './schema';

const APP_PORT = 3000;

const app = Express();

app.use('/graphql', ExpressGraphQL({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(APP_PORT, ()=>{
    console.log('Application running on Port ${APP_PORT}');
});