package db

import (
	// "database/sql"
	"fmt"
	"log"
    "os"
	"gorm.io/gorm"
	"server/models"
	// _ "github.com/denisenkom/go-mssqldb"
	"gorm.io/driver/sqlserver"

    "github.com/joho/godotenv"


    // "strconv"
)

var DB *gorm.DB

func ConnectDB() {

    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    server := os.Getenv("DB_SERVER")
    port := os.Getenv("DB_PORT")
    // portnum, portErr := strconv.Atoi(port)
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASS")
    database := os.Getenv("DB_DATABASE")

    dsn := fmt.Sprintf("sqlserver://%s:%s@%s:%s?database=%s", user, password, server, port, database)

	DB, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Error creating connection pool: %v", err)
	}

	fmt.Println("Connected to SQL Server successfully")

	err = models.Migrate(DB)

	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	fmt.Println("Database migrated successfully")
}

