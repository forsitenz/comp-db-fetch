
    "use strict";

    const winston = require("winston");
    const { Client } = require('pg');
    const client = new Client();

    ( async function(){

        // Self Executing function to
        // connect to postgres ONCE
        // Then the client will be reused;

        winston.info( `DATABASE_URI: ${process.env.DATABASE_URI}`);
        winston.info( `PGHOST:       ${process.env.PGHOST}`);
        winston.info( `PGUSER:       ${process.env.PGUSER}`);
        winston.info( `PGDATABASE:   ${process.env.PGDATABASE}`);
        winston.info( `PGPASSWORD:   ${process.env.PGPASSWORD}`);
        winston.info( `PGPORT:       ${process.env.PGPORT}`);

        try {

            await client.connect( process.env.DATABASE_URI );

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

