function normal( template, ...expressions ) {
    return template.reduce( ( accumulator, part, i ) => {
        return accumulator + expressions[ i - 1 ] + part;
    });
}

export const detab = ( template, ...expressions ) =>
    normal( template, ...expressions ).replace( /(^\s+)/gm, "" );
