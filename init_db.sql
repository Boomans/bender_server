CREATE TABLE IF NOT EXISTS room (
    id TEXT PRIMARY KEY,
    floor INTEGER NOT NULL,
    building TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS link (
    roomid1 TEXT NOT NULL,
    roomid2 TEXT NOT NULL,
    UNIQUE(roomid1, roomid2)
);