package main

import (
	"github.com/gin-gonic/gin"
	"server/routes"
	"server/db"
	// "net/http"
)

func main () {

	db.ConnectDB()

	router := gin.Default()

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

