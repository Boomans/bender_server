export default class MainDAO {
    public static async getAll(pool) {
        const client = await pool.connect();
        try {
            const res = await client.query(
                `SELECT * FROM room JOIN link ON room.id = link.idRoom1 OR room.id = link.idRoom2;`
            );
            return res.rows;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    };
}
