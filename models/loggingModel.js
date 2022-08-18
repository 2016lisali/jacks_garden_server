import query from "../database.js";

export const addLog = (log) => {
    return query(
        "INSERT INTO logging (ip, userId, usertype, method, totalRequests, endpoint, timestamp)" +
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            log.ip,
            log.userId,
            log.usertype,
            log.method,
            log.totalRequests,
            log.endpoint,
            log.timestamp,
        ]
    );
};

export const getTotalRequest = (ip) => {
    return query("SELECT totalRequests FROM logging " + "WHERE ip=?", [ip]);
};
