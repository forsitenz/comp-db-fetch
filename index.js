
    "use strict";

    const winston = require("winston");
    const { Client } = require('pg');
    let client = null;

    async function once(){

        try {

            if ( !client ) {

                winston.info( `DATABASE_URL: ${process.env.DATABASE_URL}`);
                winston.info( `PGHOST:       ${process.env.PGHOST}`);
                winston.info( `PGUSER:       ${process.env.PGUSER}`);
                winston.info( `PGDATABASE:   ${process.env.PGDATABASE}`);
                winston.info( `PGPASSWORD:   ${process.env.PGPASSWORD}`);
                winston.info( `PGPORT:       ${process.env.PGPORT}`);

                client = new Client( process.env.DATABASE_URL );

                await client.connect();
            }

        } catch( connection_err ){

            winston.error( `CONNECTION ERROR: ${connection_err}` );

            throw connection_err;
        }

    }


    module.exports = async function( SQL_QUERY ) {

        winston.info( SQL_QUERY );

        try {

            await once();

            return await client.query( SQL_QUERY ); // If query successful it MUST ALWAYS return an array.

        } catch( query_error ) {

            winston.error( `QUERY ERROR: ${query_error}` );

            throw query_error; // If there is a query error, MUST ALWAYS pass the error up the chain.  Do not
                               // handle errors here

        }

    };

