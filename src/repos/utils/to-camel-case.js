module.exports = (rows) => {

    // parsing from _ SQL standard to Js standard camelCase
    return rows.map( row => {
        const replaced = {};

        //iterating in rows and replacing _
        for (let key in row) {
            const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
            $1.toUpperCase().replace('_','')
            );
            
            replaced[camelCase] = row[key];
        }

        return replaced;
    });

};