
    "use strict";

    const winston = require("winston");
    const { Client } = require('pg');
    const client = new Client();

    ( async function(){

        // Self Executing function to
        // connect to postgres ONCE
        // Then the client will be reused;

        try {

            await client.connect();

        } catch( connection_err ){

            winston.error( connection_err );

        }


    })();


    module.exports = async function( SQL_QUERY ) {

        winston.info( SQL_QUERY );

        try {

            return await client.query( SQL_QUERY );

        } catch( query_error ) {

            winston.error( query_error );


        }

    };

