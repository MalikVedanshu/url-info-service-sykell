package routes


import (
	"github.com/gin-gonic/gin"
	"net/http"
	
)

func AuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/auth")
	{
		authGroup.GET("/login", loginHandler)
		authGroup.POST("/signup", signupHandler)
	}
}


func loginHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Login response"})
}


func signupHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H {"message": "Register response"})
}

