package routes


import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/db"
	"server/models"
)

func AuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/signup", signupHandler)
		authGroup.GET("/user/:id", getUserById)
		authGroup.GET("/login", loginHandler)
		
	}
}

func signupHandler(c *gin.Context) {
	// c.JSON(http.StatusOK, gin.H {"message": "Register response"})

	var user models.User

	// Bind incoming JSON to user struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Create user in DB
	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully", "user": user})
}


func getUserById (c *gin.Context) {
	id := c.Param("id")
	var user models.User

	if err := db.DB.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func loginHandler(c *gin.Context) {
	// c.JSON(http.StatusOK, gin.H{"message": "Login response"})


}




