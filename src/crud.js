export const insertNewStat = async (connection, website, type, count) => {
    const lastEntry = await connection.query('SELECT * FROM stats WHERE website = ? AND type = ? ORDER BY date DESC LIMIT 1', [website, type]);
    if (!lastEntry.length || count !== lastEntry[0].count) {
        await connection.query('INSERT INTO stats SET ?', { website, type, count });
    }
};
