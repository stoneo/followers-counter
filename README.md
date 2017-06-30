Followers counter
===

A cli command to store followers counter on mysql database.

Install
---

`make install`

Run
---

```
# CREATE TABLE stats ( count INT, website VARCHAR(80), date DATETIME DEFAULT CURRENT_TIMESTAMP);
# Edit .env config file
make run
```
