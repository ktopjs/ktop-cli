# ktop-cli

### Quick Start

```bash
npm i ktop-cli -g
# ktop new projectName [--database sqlite3|mysql|pg|mssql|oracle] [--registry https://registry.npm.taobao.org]
ktop new hello # default db sqlite3
```


### migrations & seeds
```bash
# create db
$ ktop db:create [-e development]
# drop db
$ ktop db:drop [-e development]
# create a migration file
$ ktop generate migration createOrders
# run all migration files
$ ktop db:migrate
# rollback latest migrated migration file  
$ ktop db:rollback
# run seed
$ ktop db:seed
```

### console

```bash
# 进入控制台
$ ktop c/console
```

### routes

```bash
# list all routes
$ ktop routes
```

### jobs

```bash
# list all jobs
$ ktop jobs
```
