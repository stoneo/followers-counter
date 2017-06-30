Node-stats
===

A cli command to store statistics (followers, stars, pull requests, issue etc...) on MySQL database.

Install
---

```
make install
```

```sql
CREATE TABLE stats (
    id INT NOT NULL AUTO_INCREMENT,
    website VARCHAR(80),
    type VARCHAR(80),
    count INT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

Run
---

```bash
# Edit .env config file
make run
```
