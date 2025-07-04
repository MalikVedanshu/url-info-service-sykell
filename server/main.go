package main

import (
	"github.com/gin-gonic/gin"
)

func main () {
	router := gin.Default()

	router.GET("/firsthello", func(c *gin.Context) {
		c.JSON(200, gin.H {
			"test": "Hello from backend",
		})
	})

	router.Run(":5050")
}

