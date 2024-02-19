import {createReadStream} from 'fs';
import {join} from 'path';
import pkg from 'pg';
import * as fastcsv from 'fast-csv';

const {Pool} = pkg;

let stream = createReadStream(join(process.cwd(), 'prisma', 'recovery_tables', 'fields.csv'));
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
            "INSERT INTO public.\"Fields\" (field_id, field_name, ref_attribute_id) VALUES ($1, $2, $3)";

        pool.connect((err, client) => {
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
            }
        });
    });

stream.pipe(csvStream);