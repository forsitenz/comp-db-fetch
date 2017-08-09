
    "use strict";

    const winston = require("winston");
    const { Client } = require('pg');
    const client = new Client();

    ( async function(){

        // Self Executing function to
        // connect to postgres ONCE
        // Then the client will be reused;

        winston.info( process.env.PGHOST);
        winston.info( process.env.PGUSER);
        winston.info( process.env.PGDATABASE);
        winston.info( process.env.PGPASSWORD);
        winston.info( process.env.PGPORT);

        try {

            await client.connect();

        } catch( connection_err ){

            winston.error( connection_err );

        }


    })();


    module.exports = async function( SQL_QUERY ) {

        winston.info( SQL_QUERY );

        try {

            return await client.query( SQL_QUERY ); // If query successful it MUST ALWAYS return an array.

        } catch( query_error ) {

            winston.error( query_error );

            throw query_error; // If there is a query error, MUST ALWAYS pass the error up the chain.  Do not
                               // handle errors here

        }

    };

