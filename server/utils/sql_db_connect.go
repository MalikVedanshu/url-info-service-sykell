package utils

import (
	"database/sql"
	"fmt"
	"log"
    "os"
	_ "github.com/denisenkom/go-mssqldb"
    "github.com/joho/godotenv"
    // "strconv"
)

var DB *sql.DB

func ConnectDB() {

    envErrs := godotenv.Load()
    if envErrs != nil {
        log.Fatal("Error loading .env file")
    }

    server := os.Getenv("DB_SERVER")
    port := os.Getenv("DB_PORT")
    // portnum, portErr := strconv.Atoi(port)
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASS")
    database := os.Getenv("DB_DATABASE")

	var err error

    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%s;database=%s", server, user, password, port, database)

	DB, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatalf("Error creating connection pool: %s", err.Error())
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("Error connecting to db: %s", err.Error())
	}

	fmt.Println("Connected to SQL Server successfully")
}