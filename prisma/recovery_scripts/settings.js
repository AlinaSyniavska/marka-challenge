import {createReadStream} from 'fs';
import {join} from 'path';
import pkg from 'pg';
import * as fastcsv from 'fast-csv';

const {Pool} = pkg;

let stream = createReadStream(join(process.cwd(), 'prisma', 'recovery_tables', 'settings.csv'));
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        // remove the first line: header
        csvData.shift();

        // create a new connection to the database
        const databaseUrl = 'postgresql://postgres:superuser@localhost:5432/document-ai-db?schema=public';
        const pool = new Pool({
            connectionString: databaseUrl,
        })

        const query =
            "INSERT INTO public.\"Settings\" (settings_id, ref_doctype_id, ref_field_id, azure_field, google_field, ref_version_id) VALUES ($1, $2, $3, $4, $5, $6)";

        pool.connect((err, client, done) => {
            if (err) throw err;

            try {
                csvData.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("inserted " + res.rowCount + " row:", row);
                        }
                    });
                });
            } finally {
                console.log('Done!');
                done();
            }
        });
    });

stream.pipe(csvStream);