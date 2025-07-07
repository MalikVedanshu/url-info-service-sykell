package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"server/routes"
	"server/db"
	"time"
	// "net/http"
)

func main () {

	db.ConnectDB()

	router := gin.Default()


	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://192.168.178.89:3000"}, // my local host ipv4 for react
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "z-token"}, // key for my auth token z-token
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))


	router.GET("/firsthello", func(c *gin.Context) {
		c.JSON(200, gin.H {
			"test": "Hello from backend",
		})
	})

	// router.GET("/dbtst", func(c *gin.Context) {
	// 	rows, err := utils.DB.Query("SELECT id, name, email FROM users")

	// 	if err != nil {
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 		return
	// 	}
	// 	defer rows.Close()

	// 	var users []map[string]interface{}

	// 	for rows.Next() {
	// 		var id int
	// 		var name, email string
	// 		err := rows.Scan(&id, &name, &email)
	// 		if err != nil {
	// 			continue
	// 		}
	// 		users = append(users, gin.H{"id": id, "name": name, "email": email})
	// 	}

	// 	c.JSON(http.StatusOK, users)
	// })
	

	routes.AuthRoutes(router)

	router.Run(":5050")
}

